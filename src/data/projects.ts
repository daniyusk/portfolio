import type { Project } from "@/types/project"

export const projectsData: Project[] = [
    {
        id: "steal-a-garden",
        title: "Steal a Garden",
        category: "Roblox Games",
        shortDescription:
            "Roblox game blending Steal a Brainrot with Grow a Garden, featuring refactored core systems and a rebuilt combat experience.",
        fullDescription:
            "Steal a Garden combines the collection loop of Grow a Garden with the competitive progression of Steal a Brainrot. I refactored several existing gameplay systems and led the combat-system overhaul, improving its structure, feedback, and moment-to-moment interactions shown in the gameplay preview.",
        cover: {
            url: "/media/projects/steal-a-garden-cover.webp",
            alt: "Steal a Garden cover featuring the Hydra plant",
        },
        isFeatured: true,
        featuredOrder: 1,
        tags: ["Roblox", "Luau", "Combat Systems", "Game Systems", "Refactoring"],
        media: [
            {
                type: "video",
                url: "/media/projects/steal-a-garden-combat.mp4",
                alt: "Steal a Garden combat system gameplay",
                caption: "Refactored combat flow, hit feedback, and character interactions",
                fitMode: "contain",
                previewTimestamp: 2.5,
                playbackRange: { start: 2, end: 16 },
            },
        ],
        links: {},
    },
    {
        id: "project-far",
        title: "Project: FAR",
        category: "Roblox Games",
        shortDescription:
            "Roblox space game with a reactive menu interface and a modular crafting system built around responsive player feedback.",
        fullDescription:
            "Project: FAR is a space-themed Roblox experience where I focused on the crafting architecture and reactive interface systems. My work covered the animated main menu, crafting navigation, recipe selection, requirements, localization states, and the UI feedback that keeps those systems synchronized with player actions.",
        cover: {
            url: "/media/projects/project-far-cover.webp",
            alt: "Project FAR logo cover",
        },
        isFeatured: true,
        featuredOrder: 2,
        tags: ["Roblox", "Luau", "Reactive UI", "Crafting Systems", "Game Systems"],
        media: [
            {
                type: "video",
                url: "/media/projects/project-far-menu.mp4",
                alt: "Project FAR reactive main menu",
                caption: "Reactive space-themed menu and navigation states",
                fitMode: "contain",
                previewTimestamp: 4,
                playbackRange: { start: 2, end: 26 },
            },
            {
                type: "video",
                url: "/media/projects/project-far-crafting.mp4",
                alt: "Project FAR crafting interface",
                caption: "Crafting recipes, requirements, and localized UI states",
                fitMode: "contain",
                playbackRange: { start: 1.5, end: 18.5 },
            },
        ],
        links: {},
    },
]

export const getFeaturedProjects = (): Project[] => {
    return projectsData
        .filter((project) => project.isFeatured)
        .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0))
}

export const getAllProjects = (): Project[] => {
    return [...projectsData]
}

export const getProjectById = (id: string): Project | undefined => {
    return projectsData.find((project) => project.id === id)
}

export const getAllTags = (): string[] => {
    const tagSet = new Set<string>()
    for (const project of projectsData) {
        for (const tag of project.tags) {
            tagSet.add(tag)
        }
    }
    return Array.from(tagSet).sort()
}
