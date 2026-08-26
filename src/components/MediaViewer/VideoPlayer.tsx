import {
    Controls,
    FullscreenButton,
    Gesture,
    MediaAnnouncer,
    MediaPlayer,
    MediaProvider,
    MuteButton,
    PlayButton,
    Time,
    TimeSlider,
    VolumeSlider,
} from "@vidstack/react"
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useRef } from "react"
import { cn } from "@/styles/utils"
import { getPlaybackRange, type ProjectVideoMedia } from "@/utils/projectMedia"

interface VideoPlayerProps {
    media: ProjectVideoMedia
    title?: string
    onCanPlay: () => void
    onPlaying: () => void
    onWaiting: () => void
    onError: () => void
}

const controlButtonClass =
    "pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/45 text-zinc-100 outline-none backdrop-blur-md transition duration-200 hover:border-white/15 hover:bg-white/15 hover:text-white active:scale-90 focus-visible:border-white/25"

function PlayerGestures() {
    return (
        <div className="contents">
            <Gesture event="pointerup" action="toggle:paused" className="cosmic-player-gesture absolute inset-0 z-10" />
            <Gesture
                event="pointerup"
                action="toggle:controls"
                className="cosmic-player-gesture absolute inset-0 z-10"
            />
        </div>
    )
}

function TimeControl() {
    return (
        <TimeSlider.Root
            aria-label="Video progress"
            className="cosmic-time-slider group/timeline pointer-events-auto relative flex h-8 w-full cursor-pointer touch-none select-none items-center outline-none"
        >
            <TimeSlider.Track className="relative h-1 w-full overflow-hidden rounded-full bg-white/20 transition-[height] group-data-[active]/timeline:h-1.5">
                <TimeSlider.Progress className="absolute inset-y-0 left-0 w-[var(--slider-progress)] bg-white/25" />
                <TimeSlider.TrackFill className="absolute inset-y-0 left-0 w-[var(--slider-fill)] rounded-full bg-violet-400" />
            </TimeSlider.Track>

            <TimeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-data-[active]/timeline:opacity-100 group-data-[dragging]/timeline:scale-110" />

            <TimeSlider.Preview
                offset={12}
                className="cosmic-slider-preview z-50 flex overflow-hidden rounded-lg border border-white/10 bg-black/85 opacity-0 backdrop-blur-xl transition-opacity data-[visible]:opacity-100"
            >
                <TimeSlider.Value
                    type="pointer"
                    format="time"
                    className="cosmic-slider-value px-2 py-1 font-jetbrains text-[0.62rem] tabular-nums text-white"
                />
            </TimeSlider.Preview>
        </TimeSlider.Root>
    )
}

function VolumeControl() {
    return (
        <VolumeSlider.Root
            aria-label="Volume"
            className="cosmic-volume-slider group/volume pointer-events-auto relative hidden h-8 w-20 cursor-pointer touch-none select-none items-center outline-none sm:flex"
        >
            <VolumeSlider.Track className="relative h-1 w-full overflow-hidden rounded-full bg-white/20 transition-[height] group-data-[active]/volume:h-1.5">
                <VolumeSlider.TrackFill className="absolute inset-y-0 left-0 w-[var(--slider-fill)] rounded-full bg-violet-300" />
            </VolumeSlider.Track>
            <VolumeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-data-[active]/volume:opacity-100" />
        </VolumeSlider.Root>
    )
}

function PlayerControls() {
    return (
        <Controls.Root className="cosmic-controls absolute inset-0 z-20 flex flex-col opacity-0 transition-opacity duration-200 data-[visible]:opacity-100">
            <Controls.Group
                className="pointer-events-none flex flex-1 items-center justify-center"
                style={{ pointerEvents: "none" }}
            >
                <PlayButton className="cosmic-play-button pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white outline-none backdrop-blur-xl transition duration-200 hover:scale-105 hover:border-white/15 hover:bg-violet-950/70 active:scale-90 focus-visible:border-white/25">
                    <Play className="cosmic-play-icon ml-1 h-7 w-7 fill-current motion-safe:animate-[media-control-feedback_320ms_ease-out]" />
                    <Pause className="cosmic-pause-icon h-7 w-7 fill-current motion-safe:animate-[media-control-feedback_320ms_ease-out]" />
                </PlayButton>
            </Controls.Group>

            <div className="pointer-events-none bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 pb-3 pt-12 sm:px-4 sm:pb-4">
                <TimeControl />

                <Controls.Group className="mt-1 flex items-center gap-2">
                    <PlayButton className={cn(controlButtonClass, "cosmic-play-button")}>
                        <Play className="cosmic-play-icon ml-0.5 h-4 w-4 fill-current" />
                        <Pause className="cosmic-pause-icon h-4 w-4 fill-current" />
                    </PlayButton>

                    <MuteButton className={cn(controlButtonClass, "cosmic-mute-button")}>
                        <VolumeX className="cosmic-mute-icon h-4 w-4" />
                        <Volume2 className="cosmic-volume-icon h-4 w-4" />
                    </MuteButton>

                    <VolumeControl />

                    <div className="pointer-events-none ml-1 flex min-w-0 flex-1 items-center gap-1 font-jetbrains text-[0.65rem] tabular-nums text-white/85">
                        <Time type="current" />
                        <span aria-hidden="true" className="text-white/45">
                            /
                        </span>
                        <Time type="duration" />
                    </div>

                    <FullscreenButton className={cn(controlButtonClass, "cosmic-fullscreen-button")}>
                        <Maximize className="cosmic-fs-enter-icon h-4 w-4" />
                        <Minimize className="cosmic-fs-exit-icon h-4 w-4" />
                    </FullscreenButton>
                </Controls.Group>
            </div>
        </Controls.Root>
    )
}

export function VideoPlayer({ media, title, onCanPlay, onPlaying, onWaiting, onError }: VideoPlayerProps) {
    const playbackRange = getPlaybackRange(media)
    const fitMode = media.fitMode ?? "cover"
    const label = media.alt || `${title || "Project"} preview video`
    const ambienceRef = useRef<HTMLVideoElement>(null)
    const ambienceTimeRef = useRef(playbackRange?.start ?? 0)
    const isPlayingRef = useRef(false)

    const syncAmbience = (providerTime: number) => {
        ambienceTimeRef.current = providerTime

        const ambience = ambienceRef.current
        if (!ambience || ambience.readyState === 0 || Math.abs(ambience.currentTime - providerTime) < 0.25) return

        ambience.currentTime = providerTime
    }

    const playAmbience = () => {
        isPlayingRef.current = true
        syncAmbience(ambienceTimeRef.current)
        void ambienceRef.current?.play().catch(() => undefined)
    }

    const pauseAmbience = () => {
        isPlayingRef.current = false
        ambienceRef.current?.pause()
    }

    return (
        <div className="relative isolate h-full w-full overflow-hidden bg-black">
            {fitMode === "contain" && (
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                    <video
                        ref={ambienceRef}
                        src={media.url}
                        muted
                        playsInline
                        preload="metadata"
                        tabIndex={-1}
                        onLoadedMetadata={(event) => {
                            event.currentTarget.currentTime = ambienceTimeRef.current
                            if (isPlayingRef.current) void event.currentTarget.play().catch(() => undefined)
                        }}
                        className="h-full w-full scale-125 object-cover blur-2xl opacity-40 brightness-75"
                    />
                </div>
            )}

            <MediaPlayer
                src={media.url}
                title={title || media.alt}
                ariaLabel={label}
                playsInline
                muted={true}
                preload="metadata"
                load="eager"
                clipStartTime={playbackRange?.start ?? 0}
                clipEndTime={playbackRange?.end ?? 0}
                loop={Boolean(playbackRange)}
                controlsDelay={3000}
                hideControlsOnMouseLeave
                data-source={media.url}
                data-clip-start={playbackRange?.start}
                data-clip-end={playbackRange?.end}
                onCanPlay={onCanPlay}
                onPlaying={onPlaying}
                onWaiting={onWaiting}
                onError={onError}
                onPlay={playAmbience}
                onPause={pauseAmbience}
                onTimeUpdate={({ currentTime }) => syncAmbience((playbackRange?.start ?? 0) + currentTime)}
                className="group/player relative z-0 h-full w-full overflow-hidden bg-transparent outline-none"
            >
                <MediaProvider
                    className={cn(
                        "absolute inset-0 h-full w-full [&>video]:h-full [&>video]:w-full",
                        fitMode === "contain" ? "[&>video]:object-contain" : "[&>video]:object-cover",
                    )}
                    mediaProps={{
                        "aria-label": label,
                        className: cn("h-full w-full", fitMode === "contain" ? "object-contain" : "object-cover"),
                        style: { height: "100%", width: "100%", objectFit: fitMode },
                        onContextMenu: (event) => event.preventDefault(),
                    }}
                />

                <MediaAnnouncer />
                <PlayerGestures />
                <PlayerControls />
            </MediaPlayer>
        </div>
    )
}
