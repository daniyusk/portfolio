import type { ProjectMedia } from "@/types/project"

export type ProjectVideoMedia = Extract<ProjectMedia, { type: "video" }>

export interface NormalizedPlaybackRange {
    start: number
    end: number
}

export function getPlaybackRange(media: ProjectVideoMedia): NormalizedPlaybackRange | undefined {
    const range = media.playbackRange

    if (
        !range ||
        !Number.isFinite(range.start) ||
        !Number.isFinite(range.end) ||
        range.start < 0 ||
        range.end <= range.start
    ) {
        return undefined
    }

    return range
}

export function getPreviewStart(media: ProjectVideoMedia): number {
    const range = getPlaybackRange(media)
    const requestedStart = media.previewTimestamp ?? range?.start ?? 0

    if (!Number.isFinite(requestedStart) || requestedStart < 0) {
        return range?.start ?? 0
    }

    if (range && (requestedStart < range.start || requestedStart >= range.end)) {
        return range.start
    }

    return requestedStart
}

export function seekVideo(video: HTMLVideoElement, time: number): void {
    try {
        video.currentTime = time
    } catch {
        // Streams may reject seeks before their metadata is available.
    }
}
