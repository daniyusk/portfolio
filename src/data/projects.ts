import type { Project } from "@/types/project"

export const projectsData: Project[] = [
    {
        id: "orbital-ui",
        title: "Orbital 3D Engine & UI",
        category: "Interactive Experiences",
        shortDescription:
            "Interactive WebGL component library and generative shader engine built for high-performance creative web applications.",
        fullDescription:
            "Orbital UI is a specialized WebGL & Three.js design system developed to blend reactive user interfaces with mathematical generative shaders. It features custom GLSL post-processing pipelines, interactive particle physics, and a modular node editor designed to run at 60+ FPS on diverse device tiers with minimal battery overhead.",
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
        category: "Web Applications",
        shortDescription:
            "Real-time collaborative canvas with CRDT synchronization and sub-10ms distributed event streaming.",
        fullDescription:
            "Nexus Flow is a multiplayer architecture designed for high-concurrency infinite canvas interactions. Leveraging Conflict-Free Replicated Data Types (CRDT algorithms) combined with WebSocket clustering and worker threads, Nexus Flow handles concurrent vector rendering, cursor presence, and undo/redo history trees without central lock contention.",
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
        category: "Tools / CLI",
        shortDescription:
            "Browser-native high-performance terminal emulator with WebAssembly micro-containers and AI command completions.",
        fullDescription:
            "HyperTerminal is a web-based POSIX terminal environment compiled with Rust and WebAssembly. It features hardware-accelerated canvas/WebGL glyph rasterization, SSH/PTY stream multiplexing, sandboxed WASM micro-containers for client-side tool execution, and context-aware LLM command synthesis directly in the shell.",
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
        category: "Web Applications",
        shortDescription:
            "Fullstack distributed tracing and metric telemetry suite supporting OpenTelemetry and automated anomaly detection.",
        fullDescription:
            "Aura Observability delivers unified visibility into distributed microservices architectures. Engineered with Go, React, and OpenTelemetry standards, it visualizes service dependency meshes, ingests millions of span events per minute, and correlates latency anomalies with automated root-cause diagnostics and incident alerts.",
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
        category: "Tools / CLI",
        shortDescription:
            "Context-aware AI refactoring engine performing AST transformations and automated multi-file semantic migrations.",
        fullDescription:
            "Spectra is an autonomous code intelligence agent that analyzes large-scale TypeScript and Python codebases. By parsing Abstract Syntax Trees (AST) and constructing semantic call graphs, Spectra generates type-safe migrations, resolves API breaking changes, and formulates verified pull requests with comprehensive test suites.",
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
        category: "Interactive Experiences",
        shortDescription:
            "Modular digital signal processing engine and polyphonic synthesizer running in WebAssembly audio worklets.",
        fullDescription:
            "Pulse is a browser-based modular synthesizer and digital signal processing (DSP) suite. Operating directly within low-latency Web Audio Worklet threads compiled from C++ and Rust, it features dual-oscillator FM synthesis, binaural spatial panning, customizable filter topologies, and an oscilloscope visualizer.",
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
