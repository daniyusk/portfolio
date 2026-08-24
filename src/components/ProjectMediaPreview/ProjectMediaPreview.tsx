import { useEffect, useRef, useState } from "react"
import { cn } from "@/styles/utils"
import type { ProjectMedia } from "@/types/project"

export interface ProjectMediaPreviewProps {
    media: ProjectMedia
    title: string
    className?: string
}

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function ProjectMediaPreview({ media, title, className }: ProjectMediaPreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

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

                video.muted = true
                void video.play().catch(() => setIsPlaying(false))
            }
        }

        const resetPreview = () => {
            setIsPlaying(false)

            const video = videoRef.current
            if (!video) return

            video.pause()
            try {
                video.currentTime = 0
            } catch {
                // Some remote streams cannot seek until their metadata is available.
            }
        }

        trigger.addEventListener("mouseenter", startPreview)
        trigger.addEventListener("mouseleave", resetPreview)

        return () => {
            trigger.removeEventListener("mouseenter", startPreview)
            trigger.removeEventListener("mouseleave", resetPreview)
            resetPreview()
        }
    }, [media])

    const staticSource = media.type === "video" ? media.thumbnailUrl : media.thumbnailUrl || media.url

    return (
        <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden bg-zinc-950", className)}>
            {staticSource && (
                <img
                    src={staticSource}
                    alt={media.alt || `${title} preview`}
                    loading="lazy"
                    draggable={false}
                    className="pointer-events-none h-full w-full select-none object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]"
                />
            )}

            {media.type === "video" && (
                <video
                    ref={videoRef}
                    src={media.url}
                    poster={media.thumbnailUrl}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={media.thumbnailUrl ? undefined : media.alt || `${title} preview video`}
                    aria-hidden={media.thumbnailUrl ? "true" : undefined}
                    tabIndex={-1}
                    className={cn(
                        "pointer-events-none absolute inset-0 h-full w-full select-none object-cover",
                        "motion-safe:transition-opacity motion-safe:duration-200",
                        isPlaying || !media.thumbnailUrl ? "opacity-100" : "opacity-0",
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
