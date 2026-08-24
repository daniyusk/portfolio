export type MediaType = "image" | "video" | "gif"

interface ProjectMediaBase {
    url: string
    alt: string
    caption?: string
}

export type ProjectMedia = ProjectMediaBase &
    (
        | { type: "image"; thumbnailUrl?: string }
        | { type: "video"; thumbnailUrl?: string }
        | { type: "gif"; thumbnailUrl: string }
    )

export interface ProjectLinks {
    github?: string
    liveDemo?: string
    caseStudy?: string
}

export type ProjectCategory = "Interactive Experiences" | "Web Applications" | "Tools / CLI"

export interface Project {
    id: string
    title: string
    category: ProjectCategory
    shortDescription: string
    fullDescription: string
    isFeatured: boolean
    tags: string[]
    media: ProjectMedia[]
    links: ProjectLinks
    featuredOrder?: number
}
