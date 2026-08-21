import gsap from "gsap"
import { ArrowUpRight } from "lucide-react"
import {
    type CSSProperties,
    type KeyboardEvent,
    type MouseEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import { cn } from "@/styles/utils"
import type { Project } from "@/types/project"

export interface AccordionGalleryProps {
    projects: Project[]
    defaultIndex?: number
    accentColor?: string
    overlayColor?: string
    textColor?: string
    height?: number
    gap?: number
    radius?: number
    expandRatio?: number
    orientation?: "horizontal" | "vertical"
    duration?: number
    ease?: string
    parallax?: number
    tilt?: number
    stagger?: number
    trigger?: "hover" | "click"
    showLabels?: boolean
    grayscale?: boolean
    className?: string
    onSelectProject?: (project: Project) => void
}

export function AccordionGallery({
    projects,
    defaultIndex = 0,
    accentColor = "#a78bfa",
    overlayColor = "#09090b",
    textColor = "#ffffff",
    height = 480,
    gap = 12,
    radius = 20,
    expandRatio = 0.55,
    orientation = "horizontal",
    duration = 0.6,
    ease = "power3.out",
    parallax = 0.5,
    tilt = 6,
    stagger = 0.05,
    trigger = "hover",
    showLabels = true,
    grayscale = true,
    className = "",
    onSelectProject,
}: AccordionGalleryProps) {
    const rootRef = useRef<HTMLDivElement>(null)
    const panelRefs = useRef<(HTMLElement | null)[]>([])
    const mediaRefs = useRef<(HTMLElement | null)[]>([])
    const contentRefs = useRef<(HTMLElement | null)[]>([])
    const tlRef = useRef<gsap.core.Timeline | null>(null)
    const firstRunRef = useRef(true)
    const mediaSizeRef = useRef(420)

    const count = projects.length
    const [active, setActive] = useState(() => Math.min(Math.max(defaultIndex, 0), Math.max(0, count - 1)))

    const prefersReduced =
        typeof window !== "undefined" && window.matchMedia
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false

    const overlayBg = `linear-gradient(180deg, transparent 20%, color-mix(in srgb, ${overlayColor} 82%, transparent) 85%, ${overlayColor} 100%), color-mix(in srgb, ${overlayColor} calc(var(--ag-dim, 0.4) * 100%), transparent)`

    const applyLayout = useCallback(
        (animate: boolean) => {
            const panels = panelRefs.current
            if (!panels.length) return

            const r = Math.min(Math.max(expandRatio, 0.25), 0.85)
            const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1
            const mediaSize = mediaSizeRef.current

            tlRef.current?.kill()
            const dur = animate && !prefersReduced ? duration : 0
            const tl = gsap.timeline()

            panels.forEach((panel, i) => {
                if (!panel) return
                const isActive = i === active
                const media = mediaRefs.current[i]
                const content = contentRefs.current[i]

                const rot = isActive ? 0 : i < active ? tilt : -tilt
                const rotProp = { rotateY: rot }

                tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0)

                if (media) {
                    const drift = Math.max(-1.5, Math.min(1.5, active - i))
                    const shift = drift * parallax * mediaSize * 0.05
                    const gray = grayscale ? (isActive ? 0 : 1) : 0
                    tl.to(
                        media,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: isActive ? 0 : shift,
                            "--ag-gray": gray,
                            "--ag-dim": isActive ? 0 : 0.45,
                            duration: dur,
                            ease,
                        },
                        0,
                    )
                }

                if (showLabels && content) {
                    if (isActive) {
                        tl.to(
                            content,
                            {
                                opacity: 1,
                                y: 0,
                                duration: dur,
                                ease,
                                pointerEvents: "auto",
                                stagger: prefersReduced ? 0 : stagger,
                            },
                            0,
                        )
                    } else {
                        tl.to(
                            content,
                            {
                                opacity: 0,
                                y: 12,
                                duration: dur * 0.5,
                                ease,
                                pointerEvents: "none",
                            },
                            0,
                        )
                    }
                }
            })

            tlRef.current = tl
        },
        [active, count, expandRatio, duration, ease, tilt, parallax, grayscale, showLabels, stagger, prefersReduced],
    )

    useEffect(() => {
        const el = rootRef.current
        if (!el) return

        const measure = () => {
            const rect = el.getBoundingClientRect()
            const total = rect.width
            const usable = Math.max(total - gap * (count - 1), 120)
            const size = Math.max(200, usable * Math.min(Math.max(expandRatio, 0.25), 0.85) * 1.25)
            mediaSizeRef.current = size
            el.style.setProperty("--ag-media-size", `${size}px`)
            applyLayout(!firstRunRef.current)
        }

        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(el)
        return () => ro.disconnect()
    }, [applyLayout, gap, count, expandRatio])

    useEffect(() => {
        applyLayout(!firstRunRef.current)
        firstRunRef.current = false
    }, [applyLayout])

    useEffect(
        () => () => {
            tlRef.current?.kill()
        },
        [],
    )

    const handleEnter = (i: number) => {
        if (trigger === "hover") setActive(i)
    }

    const handleClick = (i: number, e: MouseEvent, project: Project) => {
        if (i !== active) {
            e.preventDefault()
            setActive(i)
        } else {
            // Already active, click opens details modal
            onSelectProject?.(project)
        }
    }

    const handleKeyDown = (i: number, e: KeyboardEvent, project: Project) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault()
            setActive((i + 1) % count)
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault()
            setActive((i - 1 + count) % count)
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            if (i === active) {
                onSelectProject?.(project)
            } else {
                setActive(i)
            }
        }
    }

    return (
        <div
            ref={rootRef}
            className={cn(
                "flex flex-row w-full max-w-full [perspective:1400px] max-[640px]:!flex-col max-[640px]:[perspective:none] select-none",
                className,
            )}
            style={{
                gap: `${gap}px`,
                height: orientation === "vertical" ? `${Math.round(height * 1.6)}px` : `${height}px`,
            }}
        >
            {projects.map((project, i) => {
                const isActive = i === active
                const primaryMedia = project.media[0]

                return (
                    <button
                        key={project.id}
                        type="button"
                        ref={(el) => {
                            panelRefs.current[i] = el
                        }}
                        className={cn(
                            "group relative block min-h-0 min-w-0 flex-[1_1_0] cursor-pointer overflow-hidden border border-white/10 bg-zinc-950 p-0 text-left no-underline outline-none",
                            "[transform-style:preserve-3d] [transform-origin:center]",
                            "shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)] transition-[border-color,box-shadow] duration-300",
                            isActive
                                ? "border-violet-400/45 shadow-[0_20px_50px_rgba(76,29,149,0.16)]"
                                : "hover:border-white/30",
                            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400",
                            "max-[640px]:min-h-[96px] max-[640px]:!transform-none",
                        )}
                        style={
                            {
                                borderRadius: `${radius}px`,
                                "--ag-accent": accentColor,
                                willChange: "flex-grow, transform",
                            } as CSSProperties
                        }
                        onClick={(e) => handleClick(i, e, project)}
                        onMouseEnter={() => handleEnter(i)}
                        onFocus={() => setActive(i)}
                        onKeyDown={(e) => handleKeyDown(i, e, project)}
                        aria-current={isActive ? "true" : undefined}
                        aria-label={`Project: ${project.title}`}
                    >
                        {/* Media Background Viewport */}
                        <div className="absolute inset-0 overflow-hidden [border-radius:inherit]">
                            <div
                                ref={(el) => {
                                    mediaRefs.current[i] = el
                                }}
                                className="absolute top-1/2 left-1/2 [filter:grayscale(var(--ag-gray,1))]"
                                style={{
                                    width: "var(--ag-media-size, 420px)",
                                    height: "100%",
                                    willChange: "transform, filter",
                                }}
                            >
                                {primaryMedia ? (
                                    primaryMedia.type === "video" ? (
                                        <video
                                            src={primaryMedia.url}
                                            poster={primaryMedia.thumbnailUrl}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="block h-full w-full select-none object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={primaryMedia.thumbnailUrl || primaryMedia.url}
                                            alt={primaryMedia.alt || project.title}
                                            draggable={false}
                                            className="pointer-events-none block h-full w-full select-none object-cover"
                                        />
                                    )
                                ) : (
                                    <div className="h-full w-full bg-zinc-900" />
                                )}
                            </div>

                            {/* Dark Gradient Overlay */}
                            <div
                                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                                style={{ background: overlayBg }}
                                aria-hidden="true"
                            />
                        </div>

                        {/* Active Content Overlay (Title, Description, Tags, Action CTA) */}
                        {showLabels && (
                            <div
                                ref={(el) => {
                                    contentRefs.current[i] = el
                                }}
                                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end space-y-3 p-5 opacity-0 sm:p-7 md:p-8"
                            >
                                {/* Accent Bar + Title */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-6 w-1 flex-none rounded-full"
                                        style={{
                                            background: accentColor,
                                            boxShadow: `0 0 12px color-mix(in srgb, ${accentColor} 80%, transparent)`,
                                        }}
                                    />
                                    <h3
                                        className="truncate font-bold text-lg tracking-tight drop-shadow-md sm:text-xl md:text-2xl lg:text-3xl"
                                        style={{ color: textColor }}
                                    >
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Short Description */}
                                <p className="line-clamp-2 max-w-2xl font-jetbrains text-xs text-zinc-300 drop-shadow sm:text-sm">
                                    {project.shortDescription}
                                </p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {project.tags.slice(0, 4).map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center rounded-md border border-violet-400/25 bg-violet-950/70 px-2.5 py-0.5 font-semibold text-[0.7rem] text-violet-200 backdrop-blur-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Project action */}
                                <div className="pt-2">
                                    <span className="inline-flex items-center gap-2 border-b border-violet-300/60 pb-1 text-xs font-semibold text-white transition-colors duration-200 group-hover:text-violet-200 sm:text-sm">
                                        <span>Open project</span>
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </span>
                                </div>
                            </div>
                        )}
                    </button>
                )
            })}
        </div>
    )
}
