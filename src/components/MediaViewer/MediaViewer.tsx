import { ChevronLeft, ChevronRight, Film, ImageIcon, RefreshCw } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { VideoPlayer } from "@/components/MediaViewer/VideoPlayer"
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

const LOADING_INDICATOR_DELAY = 180
const readyMediaUrls = new Set<string>()

function SingleMediaView({ media, title }: SingleMediaViewProps) {
    const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [showLoading, setShowLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const clearLoadingTimer = useCallback(() => {
        if (!loadingTimerRef.current) return
        clearTimeout(loadingTimerRef.current)
        loadingTimerRef.current = null
    }, [])

    const scheduleLoading = useCallback(
        (includeCachedMedia = false) => {
            clearLoadingTimer()
            if (!includeCachedMedia && readyMediaUrls.has(media.url)) return

            loadingTimerRef.current = setTimeout(() => {
                setShowLoading(true)
                loadingTimerRef.current = null
            }, LOADING_INDICATOR_DELAY)
        },
        [clearLoadingTimer, media.url],
    )

    const markReady = useCallback(() => {
        readyMediaUrls.add(media.url)
        clearLoadingTimer()
        setShowLoading(false)
    }, [clearLoadingTimer, media.url])

    const markFailed = useCallback(() => {
        readyMediaUrls.delete(media.url)
        clearLoadingTimer()
        setShowLoading(false)
        setHasError(true)
    }, [clearLoadingTimer, media.url])

    useEffect(() => {
        scheduleLoading()
        return clearLoadingTimer
    }, [clearLoadingTimer, scheduleLoading])

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
                        scheduleLoading()
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
        <div className="relative isolate h-full w-full">
            {showLoading && (
                <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-black/10">
                    <div
                        role="status"
                        aria-label="Loading media"
                        className="h-7 w-7 animate-spin rounded-full border border-white/15 border-t-white/60 bg-black/10"
                    />
                </div>
            )}

            {media.type === "video" ? (
                <VideoPlayer
                    media={media}
                    title={title}
                    onCanPlay={markReady}
                    onPlaying={markReady}
                    onWaiting={() => scheduleLoading(true)}
                    onError={markFailed}
                />
            ) : (
                <>
                    {media.fitMode === "contain" && (
                        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                            <img
                                src={media.thumbnailUrl || media.url}
                                alt=""
                                className="h-full w-full scale-125 object-cover blur-2xl opacity-40 brightness-75"
                            />
                        </div>
                    )}
                    <img
                        src={media.url}
                        alt={media.alt || `${title || "Project"} preview image`}
                        loading="lazy"
                        onLoad={markReady}
                        onError={markFailed}
                        className={cn(
                            "relative h-full w-full transition-all duration-500 group-hover/media:scale-105",
                            media.fitMode === "contain" ? "object-contain" : "object-cover",
                        )}
                    />
                </>
            )}
        </div>
    )
}

export function MediaViewer({ media, className, aspectRatio = "aspect-video", title }: MediaViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const touchStartXRef = useRef<number | null>(null)
    const touchStartYRef = useRef<number | null>(null)
    const touchDeltaXRef = useRef(0)
    const touchDeltaYRef = useRef(0)

    const currentMedia: ProjectMedia | undefined = media[currentIndex]

    const handlePrev = useCallback(
        (e?: React.MouseEvent | React.TouchEvent) => {
            if (e) {
                e.stopPropagation()
            }
            if (media.length <= 1) return
            setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
        },
        [media.length],
    )

    const handleNext = useCallback(
        (e?: React.MouseEvent | React.TouchEvent) => {
            if (e) {
                e.stopPropagation()
            }
            if (media.length <= 1) return
            setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
        },
        [media.length],
    )

    const handleDotClick = (index: number, e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setCurrentIndex(index)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        if (media.length <= 1) return
        touchStartXRef.current = e.touches[0].clientX
        touchStartYRef.current = e.touches[0].clientY
        touchDeltaXRef.current = 0
        touchDeltaYRef.current = 0
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartXRef.current === null || touchStartYRef.current === null) return
        touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current
        touchDeltaYRef.current = e.touches[0].clientY - touchStartYRef.current
    }

    const handleTouchEnd = () => {
        if (touchStartXRef.current === null || touchStartYRef.current === null) return
        const dx = touchDeltaXRef.current
        const dy = touchDeltaYRef.current
        const minSwipeDistance = 35

        if (Math.abs(dx) > minSwipeDistance && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) {
                handleNext()
            } else {
                handlePrev()
            }
        }

        touchStartXRef.current = null
        touchStartYRef.current = null
        touchDeltaXRef.current = 0
        touchDeltaYRef.current = 0
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            className={cn(
                "group/media relative w-full select-none overflow-hidden rounded-xl border border-white/5 bg-zinc-950/80 touch-pan-y",
                aspectRatio,
                className,
            )}
        >
            {/* Active Media Component with Key for automatic state re-initialization */}
            <SingleMediaView key={currentMedia.url} media={currentMedia} title={title} />

            {/* Multiple media indicators and navigation */}
            {media.length > 1 && (
                <>
                    {/* Navigation Arrows */}
                    <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous preview media"
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/10 bg-black/65 text-zinc-200 backdrop-blur-md opacity-100 sm:opacity-0 sm:group-hover/media:opacity-100 focus-visible:opacity-100 transition-all duration-200 hover:border-white/20 hover:bg-violet-600 hover:text-white active:scale-90"
                    >
                        <ChevronLeft className="h-4.5 w-4.5 sm:h-4 sm:w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next preview media"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/10 bg-black/65 text-zinc-200 backdrop-blur-md opacity-100 sm:opacity-0 sm:group-hover/media:opacity-100 focus-visible:opacity-100 transition-all duration-200 hover:border-white/20 hover:bg-violet-600 hover:text-white active:scale-90"
                    >
                        <ChevronRight className="h-4.5 w-4.5 sm:h-4 sm:w-4" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute top-3 inset-x-0 z-20 flex items-center justify-center gap-1.5 pointer-events-auto">
                        {media.map((item, idx) => (
                            <button
                                key={item.url}
                                type="button"
                                onClick={(e) => handleDotClick(idx, e)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className="flex items-center justify-center p-1"
                            >
                                <span
                                    className={cn(
                                        "block h-1.5 rounded-full transition-all duration-200",
                                        idx === currentIndex
                                            ? "w-5 bg-violet-400"
                                            : "w-1.5 bg-white/40 hover:bg-white/70",
                                    )}
                                />
                            </button>
                        ))}
                    </div>
                </>
            )}

            {/* Subtle Gradient Shade on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover/media:opacity-30" />
        </div>
    )
}
