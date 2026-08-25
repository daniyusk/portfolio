import { Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/styles/utils"
import { getPlaybackRange, type ProjectVideoMedia, seekVideo } from "@/utils/projectMedia"

interface VideoPlayerProps {
    media: ProjectVideoMedia
    title?: string
    isLoading: boolean
    onLoadedData: () => void
    onError: () => void
}

type PlaybackFeedback = "play" | "pause"

const CONTROLS_HIDE_DELAY = 3000

const isTouchFirstDevice = () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches

const formatTimestamp = (time: number) => {
    const safeTime = Number.isFinite(time) ? Math.max(0, time) : 0
    const minutes = Math.floor(safeTime / 60)
    const seconds = Math.floor(safeTime % 60)

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export function VideoPlayer({ media, title, isLoading, onLoadedData, onError }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const feedbackIdRef = useRef(0)
    const lastPointerTypeRef = useRef<string | null>(null)
    const isScrubbingRef = useRef(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [controlsVisible, setControlsVisible] = useState(() => !isTouchFirstDevice())
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [hoverTime, setHoverTime] = useState<number | null>(null)
    const [feedback, setFeedback] = useState<{ id: number; type: PlaybackFeedback } | null>(null)
    const playbackRange = getPlaybackRange(media)
    const fitMode = media.fitMode ?? "cover"
    const timelineStart = playbackRange?.start ?? 0
    const configuredEnd = playbackRange?.end ?? duration
    const timelineEnd = duration > 0 ? Math.min(configuredEnd, duration) : configuredEnd
    const canSeek = timelineEnd > timelineStart
    const safeCurrentTime = canSeek ? Math.min(timelineEnd, Math.max(timelineStart, currentTime)) : timelineStart
    const progress = canSeek ? ((safeCurrentTime - timelineStart) / (timelineEnd - timelineStart)) * 100 : 0

    useEffect(() => {
        return () => {
            if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
        }
    }, [])

    const clearControlsTimeout = () => {
        if (!controlsTimeoutRef.current) return
        clearTimeout(controlsTimeoutRef.current)
        controlsTimeoutRef.current = null
    }

    const scheduleControlsHide = () => {
        clearControlsTimeout()
        controlsTimeoutRef.current = setTimeout(() => setControlsVisible(false), CONTROLS_HIDE_DELAY)
    }

    const revealControls = (autoHide = isPlaying) => {
        setControlsVisible(true)
        if (autoHide) scheduleControlsHide()
        else clearControlsTimeout()
    }

    const showFeedback = (type: PlaybackFeedback) => {
        if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)

        feedbackIdRef.current += 1
        setFeedback({ id: feedbackIdRef.current, type })
        feedbackTimeoutRef.current = setTimeout(() => setFeedback(null), 700)
    }

    const keepInsidePlaybackRange = (video: HTMLVideoElement) => {
        if (!playbackRange) return false

        if (video.currentTime < playbackRange.start || video.currentTime >= playbackRange.end) {
            seekVideo(video, playbackRange.start)
            setCurrentTime(playbackRange.start)
            return true
        }

        return false
    }

    const togglePlayback = () => {
        const video = videoRef.current
        if (!video) return

        revealControls(!isPlaying)

        if (!isPlaying) {
            keepInsidePlaybackRange(video)
            showFeedback("play")
            void video.play().catch(() => setIsPlaying(false))
            return
        }

        showFeedback("pause")
        video.pause()
    }

    const handleSurfaceActivation = (event: React.MouseEvent<HTMLButtonElement>) => {
        const isKeyboardActivation = event.detail === 0

        if (!isKeyboardActivation && lastPointerTypeRef.current === "touch" && !controlsVisible) {
            revealControls(isPlaying)
            return
        }

        togglePlayback()
    }

    const toggleMuted = () => {
        const video = videoRef.current
        if (!video) return

        const nextMuted = !video.muted
        video.muted = nextMuted
        setIsMuted(nextMuted)
        revealControls(isPlaying)
    }

    const seekTo = (time: number) => {
        if (!canSeek) return

        const nextTime = Math.min(timelineEnd, Math.max(timelineStart, time))
        const video = videoRef.current
        if (video) seekVideo(video, nextTime)
        setCurrentTime(nextTime)
        revealControls(isPlaying)
    }

    const getTimeFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        if (!canSeek || bounds.width <= 0) return timelineStart

        const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
        return timelineStart + ratio * (timelineEnd - timelineStart)
    }

    return (
        <div
            className="relative h-full w-full overflow-hidden bg-black"
            onPointerMove={(event) => {
                if (event.pointerType !== "touch") revealControls(isPlaying)
            }}
        >
            {fitMode === "contain" && media.thumbnailUrl && (
                <img
                    src={media.thumbnailUrl}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] scale-110 object-cover opacity-30 blur-2xl saturate-150"
                />
            )}

            {fitMode === "contain" && (
                <div className="pointer-events-none absolute inset-0 bg-black/35" aria-hidden="true" />
            )}

            <video
                ref={videoRef}
                src={media.url}
                poster={media.thumbnailUrl}
                muted
                playsInline
                preload="metadata"
                disablePictureInPicture
                controlsList="nodownload noplaybackrate nofullscreen"
                aria-label={media.alt || `${title || "Project"} preview video`}
                onContextMenu={(event) => event.preventDefault()}
                onLoadedMetadata={(event) => {
                    const video = event.currentTarget
                    const videoDuration = Number.isFinite(video.duration) ? video.duration : 0
                    const initialTime = playbackRange?.start ?? 0

                    setDuration(videoDuration)
                    setCurrentTime(initialTime)
                    seekVideo(video, initialTime)
                }}
                onLoadedData={onLoadedData}
                onPlay={() => {
                    setIsPlaying(true)
                    setControlsVisible(true)
                    scheduleControlsHide()
                }}
                onPause={() => {
                    setIsPlaying(false)
                    setControlsVisible(true)
                    clearControlsTimeout()
                }}
                onEnded={(event) => {
                    if (playbackRange) {
                        seekVideo(event.currentTarget, playbackRange.start)
                        setCurrentTime(playbackRange.start)
                        void event.currentTarget.play()
                        return
                    }

                    setIsPlaying(false)
                    setControlsVisible(true)
                    clearControlsTimeout()
                }}
                onTimeUpdate={(event) => {
                    if (!keepInsidePlaybackRange(event.currentTarget)) {
                        setCurrentTime(event.currentTarget.currentTime)
                    }
                }}
                onError={onError}
                className={cn(
                    "relative h-full w-full transition-opacity duration-300",
                    fitMode === "contain" ? "object-contain" : "object-cover",
                    isLoading ? "opacity-0" : "opacity-100",
                )}
            >
                <track kind="captions" />
            </video>

            <button
                type="button"
                data-video-surface
                onPointerDown={(event) => {
                    lastPointerTypeRef.current = event.pointerType
                }}
                onFocus={() => revealControls(isPlaying)}
                onClick={handleSurfaceActivation}
                onKeyDown={(event) => {
                    if (event.code !== "Space") return
                    event.preventDefault()
                    lastPointerTypeRef.current = null
                    togglePlayback()
                }}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="group/surface absolute inset-0 z-10 cursor-pointer outline-none"
            >
                <span
                    aria-hidden="true"
                    className={cn(
                        "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200",
                        controlsVisible && !feedback ? "opacity-100" : "opacity-0",
                    )}
                >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/45 text-white shadow-xl backdrop-blur-md transition-transform group-focus-visible/surface:scale-110 group-focus-visible/surface:ring-2 group-focus-visible/surface:ring-violet-300">
                        {isPlaying ? (
                            <Pause className="h-7 w-7 fill-current" />
                        ) : (
                            <Play className="ml-1 h-7 w-7 fill-current" />
                        )}
                    </span>
                </span>
            </button>

            {feedback && (
                <div
                    key={feedback.id}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
                >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white shadow-2xl backdrop-blur-md motion-safe:animate-[media-feedback_700ms_ease-out_forwards]">
                        {feedback.type === "play" ? (
                            <Play className="ml-1 h-7 w-7 fill-current" />
                        ) : (
                            <Pause className="h-7 w-7 fill-current" />
                        )}
                    </span>
                </div>
            )}

            <div
                className={cn(
                    "absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-3 pb-3 pt-12 transition-opacity duration-200 sm:px-4 sm:pb-4",
                    controlsVisible ? "opacity-100" : "pointer-events-none opacity-0",
                )}
            >
                <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-jetbrains text-[0.65rem] tabular-nums text-white/85">
                        {formatTimestamp(safeCurrentTime)} / {formatTimestamp(timelineEnd)}
                    </span>

                    <button
                        type="button"
                        onClick={toggleMuted}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                        aria-pressed={!isMuted}
                        tabIndex={controlsVisible ? 0 : -1}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-zinc-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] outline-none backdrop-blur-md transition-all hover:bg-black/70 hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-violet-300"
                    >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                </div>

                <div
                    data-testid="video-timeline"
                    className="group/timeline relative h-4 rounded-full focus-within:ring-1 focus-within:ring-violet-300/80"
                    onPointerMove={(event) => {
                        const pointedTime = getTimeFromPointer(event)
                        setHoverTime(pointedTime)
                        if (isScrubbingRef.current) seekTo(pointedTime)
                        revealControls(isPlaying)
                    }}
                    onPointerDown={(event) => {
                        isScrubbingRef.current = true
                        event.currentTarget.setPointerCapture?.(event.pointerId)
                        const pointedTime = getTimeFromPointer(event)
                        setHoverTime(pointedTime)
                        seekTo(pointedTime)
                    }}
                    onPointerUp={(event) => {
                        isScrubbingRef.current = false
                        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
                            event.currentTarget.releasePointerCapture?.(event.pointerId)
                        }
                    }}
                    onPointerCancel={() => {
                        isScrubbingRef.current = false
                    }}
                    onPointerLeave={() => {
                        if (!isScrubbingRef.current) setHoverTime(null)
                    }}
                >
                    {hoverTime !== null && canSeek && (
                        <div
                            className="pointer-events-none absolute bottom-6 z-40 -translate-x-1/2 overflow-hidden rounded-lg bg-black/85 text-center shadow-2xl ring-1 ring-white/15 backdrop-blur-md"
                            style={{
                                left: `${Math.min(95, Math.max(5, ((hoverTime - timelineStart) / (timelineEnd - timelineStart)) * 100))}%`,
                            }}
                        >
                            {media.thumbnailUrl && (
                                <img
                                    src={media.thumbnailUrl}
                                    alt=""
                                    aria-hidden="true"
                                    className="h-14 w-24 object-cover opacity-80 sm:h-16 sm:w-28"
                                />
                            )}
                            <span className="block px-2 py-1 font-jetbrains text-[0.62rem] tabular-nums text-white">
                                {formatTimestamp(hoverTime)}
                            </span>
                        </div>
                    )}

                    <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition-[height] group-hover/timeline:h-1.5">
                        <div
                            className="h-full rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.75)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <input
                        type="range"
                        min={timelineStart}
                        max={canSeek ? timelineEnd : timelineStart + 0.01}
                        step="0.01"
                        value={safeCurrentTime}
                        disabled={!canSeek}
                        tabIndex={controlsVisible ? 0 : -1}
                        aria-label="Video progress"
                        aria-valuetext={`${formatTimestamp(safeCurrentTime)} of ${formatTimestamp(timelineEnd)}`}
                        onPointerDown={() => revealControls(isPlaying)}
                        onChange={(event) => seekTo(event.currentTarget.valueAsNumber)}
                        className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0 outline-none disabled:cursor-default"
                    />
                </div>
            </div>
        </div>
    )
}
