import { ChevronLeft, ChevronRight, Film, ImageIcon, Play, RefreshCw } from "lucide-react"
import { useState } from "react"
import { cn } from "@/styles/utils"
import type { ProjectMedia } from "@/types/project"

export interface MediaViewerProps {
    media: ProjectMedia[]
    className?: string
    aspectRatio?: string
    title?: string
}

interface SingleMediaViewProps {
    media: ProjectMedia
    title?: string
}

function SingleMediaView({ media, title }: SingleMediaViewProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    if (hasError) {
        return (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-zinc-950/95 p-4 text-center font-jetbrains">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-950/50 border border-violet-800/40 text-violet-300">
                    {media.type === "video" ? <Film className="h-5 w-5" /> : <ImageIcon className="h-5 w-5" />}
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-medium text-zinc-300">{media.alt || "Preview asset unavailable"}</p>
                    <p className="text-[0.7rem] text-zinc-500">Could not load remote media stream</p>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        setHasError(false)
                        setIsLoading(true)
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[0.7rem] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <RefreshCw className="h-3 w-3" />
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="relative h-full w-full">
            {isLoading && (
                <div className="absolute inset-0 z-10 flex animate-pulse items-center justify-center bg-zinc-900/90 backdrop-blur-sm">
                    <div className="flex items-center gap-2 font-jetbrains text-xs text-zinc-400">
                        <RefreshCw className="h-4 w-4 animate-spin text-violet-400" />
                        <span>Loading asset...</span>
                    </div>
                </div>
            )}

            {media.type === "video" ? (
                <video
                    src={media.url}
                    poster={media.thumbnailUrl}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={media.alt || `${title || "Project"} preview video`}
                    onLoadedData={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false)
                        setHasError(true)
                    }}
                    className={cn(
                        "h-full w-full object-cover transition-opacity duration-300",
                        isLoading ? "opacity-0" : "opacity-100",
                    )}
                >
                    <track kind="captions" />
                </video>
            ) : (
                <img
                    src={media.url}
                    alt={media.alt || `${title || "Project"} preview image`}
                    loading="lazy"
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false)
                        setHasError(true)
                    }}
                    className={cn(
                        "h-full w-full object-cover transition-all duration-500 group-hover/media:scale-105",
                        isLoading ? "opacity-0" : "opacity-100",
                    )}
                />
            )}
        </div>
    )
}

export function MediaViewer({ media, className, aspectRatio = "aspect-video", title }: MediaViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const currentMedia: ProjectMedia | undefined = media[currentIndex]

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        if (media.length <= 1) return
        setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
    }

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        if (media.length <= 1) return
        setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
    }

    const handleDotClick = (index: number, e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setCurrentIndex(index)
    }

    if (!currentMedia || media.length === 0) {
        return (
            <div
                className={cn(
                    "relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-950/60 border border-white/10 text-zinc-600 font-jetbrains",
                    aspectRatio,
                    className,
                )}
            >
                <div className="flex flex-col items-center gap-2 text-center p-4">
                    <ImageIcon className="h-8 w-8 text-zinc-700" />
                    <span className="text-xs text-zinc-500">No media available</span>
                </div>
            </div>
        )
    }

    return (
        <div
            className={cn(
                "group/media relative w-full overflow-hidden rounded-xl bg-zinc-950/80 border border-white/10 shadow-inner select-none",
                aspectRatio,
                className,
            )}
        >
            {/* Active Media Component with Key for automatic state re-initialization */}
            <SingleMediaView key={currentMedia.url} media={currentMedia} title={title} />

            {/* Media Type Badge */}
            <div className="pointer-events-none absolute top-2.5 right-2.5 z-20 flex items-center gap-1 rounded-md bg-zinc-950/80 px-2 py-0.5 font-jetbrains text-[0.65rem] font-semibold tracking-wider text-violet-300 backdrop-blur-md border border-white/10 shadow-sm uppercase">
                {currentMedia.type === "video" && <Play className="h-2.5 w-2.5 fill-current" />}
                {currentMedia.type === "gif" && <span className="font-bold">GIF</span>}
                {currentMedia.type === "image" && <span>IMG</span>}
            </div>

            {/* Multiple media indicators and navigation */}
            {media.length > 1 && (
                <>
                    {/* Navigation Arrows */}
                    <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous preview media"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950/75 text-zinc-300 opacity-0 backdrop-blur-md transition-all duration-200 hover:bg-violet-600 hover:text-white group-hover/media:opacity-100 focus-visible:opacity-100"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next preview media"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950/75 text-zinc-300 opacity-0 backdrop-blur-md transition-all duration-200 hover:bg-violet-600 hover:text-white group-hover/media:opacity-100 focus-visible:opacity-100"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-2.5 inset-x-0 z-20 flex items-center justify-center gap-1.5">
                        {media.map((item, idx) => (
                            <button
                                key={item.url}
                                type="button"
                                onClick={(e) => handleDotClick(idx, e)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-200",
                                    idx === currentIndex
                                        ? "w-5 bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                                        : "w-1.5 bg-white/40 hover:bg-white/70",
                                )}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Subtle Gradient Shade on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover/media:opacity-30" />
        </div>
    )
}
