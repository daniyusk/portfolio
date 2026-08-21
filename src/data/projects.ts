import type { Project } from "@/types/project"

export const projectsData: Project[] = [
    {
        id: "orbital-ui",
        title: "Orbital 3D Engine & UI",
        description:
            "Interactive WebGL component library and generative shader engine built for high-performance creative web applications and immersive experiences.",
        isFeatured: true,
        featuredOrder: 1,
        tags: ["React", "Three.js", "TypeScript", "WebGL", "Tailwind CSS"],
        media: [
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
                thumbnailUrl:
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=60",
                alt: "Orbital 3D UI shader visualization preview",
                caption: "Generative shader viewport and live node graph",
            },
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
                thumbnailUrl:
                    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=60",
                alt: "Interactive lighting and material editor interface",
                caption: "Lighting and physical material controls",
            },
        ],
        links: {
            github: "https://github.com/daniyusk",
            liveDemo: "https://daniyusk.github.io",
            caseStudy: "https://github.com/daniyusk",
        },
    },
    {
        id: "nexus-flow",
        title: "Nexus Flow Collaborative Canvas",
        description:
            "Real-time multiplayer workspace featuring conflict-free replicated data types (CRDTs), distributed event streaming, and sub-10ms state synchronization.",
        isFeatured: true,
        featuredOrder: 2,
        tags: ["TypeScript", "WebSocket", "Node.js", "CRDT", "React"],
        media: [
            {
                type: "video",
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                thumbnailUrl:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                alt: "Nexus Flow real-time collaborative workspace demo",
                caption: "Multiplayer cursor tracking and live state sync",
            },
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                thumbnailUrl:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=60",
                alt: "Real-time analytics dashboard view",
                caption: "Distributed node telemetry and latency charts",
            },
        ],
        links: {
            github: "https://github.com/daniyusk",
            liveDemo: "https://daniyusk.github.io",
        },
    },
    {
        id: "hyperterminal-cli",
        title: "HyperTerminal Cloud Shell",
        description:
            "Browser-native high-performance terminal emulator with WebAssembly micro-containers, PTY multiplexing, SSH tunneling, and AI command completions.",
        isFeatured: true,
        featuredOrder: 3,
        tags: ["Rust", "WASM", "React", "Docker", "Tailwind CSS"],
        media: [
            {
                type: "gif",
                url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80",
                thumbnailUrl:
                    "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=400&q=60",
                alt: "HyperTerminal interactive command-line session",
                caption: "Hardware-accelerated terminal render buffer",
            },
        ],
        links: {
            github: "https://github.com/daniyusk",
            liveDemo: "https://daniyusk.github.io",
            caseStudy: "https://github.com/daniyusk",
        },
    },
    {
        id: "aura-observability",
        title: "Aura Microservices Observability",
        description:
            "Fullstack distributed tracing and metric monitoring suite built with Go and React, supporting OpenTelemetry instrumentation and automated anomaly alerts.",
        isFeatured: false,
        tags: ["Fullstack", "Go", "React", "PostgreSQL", "OpenTelemetry"],
        media: [
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
                thumbnailUrl:
                    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&q=60",
                alt: "Aura distributed tracing topology map",
                caption: "Service mesh dependency graph and span visualizer",
            },
        ],
        links: {
            github: "https://github.com/daniyusk",
            liveDemo: "https://daniyusk.github.io",
        },
    },
    {
        id: "spectra-agent",
        title: "Spectra Autonomous Refactoring Agent",
        description:
            "Context-aware AI coding agent that performs multi-file semantic analysis, AST tree transformations, dependency audits, and automated PR generation.",
        isFeatured: false,
        tags: ["Python", "FastAPI", "React", "TypeScript", "LLM"],
        media: [
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
                thumbnailUrl:
                    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=60",
                alt: "Spectra agent multi-file AST diff viewer",
                caption: "Automated semantic migration and diff analysis",
            },
        ],
        links: {
            github: "https://github.com/daniyusk",
            caseStudy: "https://github.com/daniyusk",
        },
    },
    {
        id: "pulse-dsp-audio",
        title: "Pulse Spatial Audio Synthesizer",
        description:
            "Modular digital signal processing (DSP) engine and polyphonic synthesizer executing entirely in WebAssembly audio worklets with spatial binaural panning.",
        isFeatured: false,
        tags: ["Web Audio API", "TypeScript", "WASM", "DSP", "Canvas API"],
        media: [
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
                thumbnailUrl:
                    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=60",
                alt: "Pulse polyphonic modular synthesizer patchboard",
                caption: "Oscillator frequency modulation and spatial filter matrix",
            },
        ],
        links: {
            github: "https://github.com/daniyusk",
            liveDemo: "https://daniyusk.github.io",
        },
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

export const getAllTags = (): string[] => {
    const tagSet = new Set<string>()
    for (const project of projectsData) {
        for (const tag of project.tags) {
            tagSet.add(tag)
        }
    }
    return Array.from(tagSet).sort()
}
