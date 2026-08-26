export type MediaType = "image" | "video" | "gif"

interface ProjectMediaBase {
    url: string
    alt: string
    caption?: string
    fitMode?: "cover" | "contain"
}

export interface PlaybackRange {
    start: number
    end: number
}

export type ProjectMedia = ProjectMediaBase &
    (
        | { type: "image"; thumbnailUrl?: string }
        | {
              type: "video"
              previewTimestamp?: number
              playbackRange?: PlaybackRange
          }
        | { type: "gif"; thumbnailUrl: string }
    )

export interface ProjectLinks {
    github?: string
    liveDemo?: string
    caseStudy?: string
}

export interface ProjectCover {
    url: string
    alt: string
}

export type ProjectCategory = "Roblox Games"

export interface Project {
    id: string
    title: string
    category: ProjectCategory
    shortDescription: string
    fullDescription: string
    cover?: ProjectCover
    isFeatured: boolean
    tags: string[]
    media: ProjectMedia[]
    links: ProjectLinks
    featuredOrder?: number
}
