import { MediaPlayer, type MediaPlayerInstance, MediaProvider } from "@vidstack/react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/styles/utils"
import type { ProjectCover, ProjectMedia } from "@/types/project"
import { getPlaybackRange, getPreviewStart } from "@/utils/projectMedia"

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
    const playerRef = useRef<MediaPlayerInstance>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasVideoError, setHasVideoError] = useState(false)
    const videoMedia = media.type === "video" ? media : undefined
    const previewStart = videoMedia ? getPreviewStart(videoMedia) : 0
    const playbackRange = videoMedia ? getPlaybackRange(videoMedia) : undefined

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        const trigger = container.closest<HTMLElement>("[data-project-preview-trigger]") ?? container

        const startPreview = () => {
            if (prefersReducedMotion() || media.type === "image" || hasVideoError) return

            setIsPlaying(true)

            if (media.type === "video") {
                const player = playerRef.current
                if (!player) return

                player.muted = true
                player.currentTime = 0
                void player.play().catch(() => setIsPlaying(false))
            }
        }

        const resetPreview = () => {
            setIsPlaying(false)

            const player = playerRef.current
            if (!player) return

            player.pause()
            player.currentTime = 0
        }

        trigger.addEventListener("mouseenter", startPreview)
        trigger.addEventListener("mouseleave", resetPreview)

        return () => {
            trigger.removeEventListener("mouseenter", startPreview)
            trigger.removeEventListener("mouseleave", resetPreview)
            resetPreview()
        }
    }, [hasVideoError, media])

    const mediaFallback = media.type === "video" ? undefined : media.thumbnailUrl || media.url
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
                <MediaPlayer
                    ref={playerRef}
                    src={media.url}
                    title={`${title} preview`}
                    ariaLabel={staticSource ? undefined : media.alt || `${title} preview video`}
                    muted={true}
                    loop
                    playsInline
                    preload="metadata"
                    load="eager"
                    clipStartTime={previewStart}
                    clipEndTime={playbackRange?.end ?? 0}
                    data-source={media.url}
                    data-preview-start={previewStart}
                    data-clip-end={playbackRange?.end}
                    onError={() => {
                        setIsPlaying(false)
                        setHasVideoError(true)
                    }}
                    className={cn(
                        "pointer-events-none absolute inset-0 h-full w-full select-none bg-zinc-950 outline-none",
                        "motion-safe:transition-opacity motion-safe:duration-200",
                        (isPlaying || !staticSource) && !hasVideoError ? "opacity-100" : "opacity-0",
                    )}
                    tabIndex={-1}
                >
                    <MediaProvider
                        className="h-full w-full [&>video]:h-full [&>video]:w-full [&>video]:object-cover"
                        mediaProps={{
                            "aria-hidden": staticSource ? "true" : undefined,
                            "aria-label": staticSource ? undefined : media.alt || `${title} preview video`,
                            className: "h-full w-full object-cover",
                            style: { height: "100%", width: "100%", objectFit: "cover" },
                            tabIndex: -1,
                        }}
                    />
                </MediaPlayer>
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
