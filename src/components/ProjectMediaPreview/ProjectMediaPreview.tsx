import { useEffect, useRef, useState } from "react"
import { cn } from "@/styles/utils"
import type { ProjectCover, ProjectMedia } from "@/types/project"
import { getPlaybackRange, getPreviewStart, seekVideo } from "@/utils/projectMedia"

export interface ProjectMediaPreviewProps {
    media: ProjectMedia
    cover?: ProjectCover
    title: string
    className?: string
}

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function ProjectMediaPreview({ media, cover, title, className }: ProjectMediaPreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const isPreviewActiveRef = useRef(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const videoMedia = media.type === "video" ? media : undefined
    const previewStart = videoMedia ? getPreviewStart(videoMedia) : 0
    const playbackRange = videoMedia ? getPlaybackRange(videoMedia) : undefined

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        const trigger = container.closest<HTMLElement>("[data-project-preview-trigger]") ?? container

        const startPreview = () => {
            if (prefersReducedMotion() || media.type === "image") return

            setIsPlaying(true)

            if (media.type === "video") {
                const video = videoRef.current
                if (!video) return

                isPreviewActiveRef.current = true
                video.muted = true
                seekVideo(video, previewStart)
                void video.play().catch(() => setIsPlaying(false))
            }
        }

        const resetPreview = () => {
            setIsPlaying(false)

            const video = videoRef.current
            if (!video) return

            isPreviewActiveRef.current = false
            video.pause()
            seekVideo(video, previewStart)
        }

        trigger.addEventListener("mouseenter", startPreview)
        trigger.addEventListener("mouseleave", resetPreview)

        return () => {
            trigger.removeEventListener("mouseenter", startPreview)
            trigger.removeEventListener("mouseleave", resetPreview)
            resetPreview()
        }
    }, [media, previewStart])

    const mediaFallback = media.type === "video" ? media.thumbnailUrl : media.thumbnailUrl || media.url
    const staticSource = cover?.url || mediaFallback
    const staticAlt = cover?.alt || media.alt || `${title} preview`

    return (
        <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden bg-zinc-950", className)}>
            {staticSource && (
                <img
                    src={staticSource}
                    alt={staticAlt}
                    loading="lazy"
                    draggable={false}
                    className="pointer-events-none h-full w-full select-none object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]"
                />
            )}

            {media.type === "video" && (
                <video
                    ref={videoRef}
                    src={media.url}
                    poster={cover?.url || media.thumbnailUrl}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={staticSource ? undefined : media.alt || `${title} preview video`}
                    aria-hidden={staticSource ? "true" : undefined}
                    tabIndex={-1}
                    onLoadedMetadata={(event) => seekVideo(event.currentTarget, previewStart)}
                    onTimeUpdate={(event) => {
                        if (
                            isPreviewActiveRef.current &&
                            playbackRange &&
                            event.currentTarget.currentTime >= playbackRange.end
                        ) {
                            seekVideo(event.currentTarget, playbackRange.start)
                        }
                    }}
                    className={cn(
                        "pointer-events-none absolute inset-0 h-full w-full select-none object-cover",
                        "motion-safe:transition-opacity motion-safe:duration-200",
                        isPlaying || !staticSource ? "opacity-100" : "opacity-0",
                    )}
                />
            )}

            {media.type === "gif" && isPlaying && (
                <img
                    src={media.url}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                />
            )}
        </div>
    )
}
