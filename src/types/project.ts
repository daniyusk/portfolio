export type MediaType = "image" | "video" | "gif"

export interface ProjectMedia {
    type: MediaType
    url: string
    thumbnailUrl?: string
    alt: string
    caption?: string
}

export interface ProjectLinks {
    github?: string
    liveDemo?: string
    caseStudy?: string
}

export interface Project {
    id: string
    title: string
    shortDescription: string
    fullDescription: string
    isFeatured: boolean
    tags: string[]
    media: ProjectMedia[]
    links: ProjectLinks
    featuredOrder?: number
}
