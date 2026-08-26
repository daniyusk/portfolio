import { ExternalLink, FileText, X } from "lucide-react"
import { Github } from "pixelarticons/react/Github"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { MediaViewer } from "@/components/MediaViewer"
import type { Project } from "@/types/project"

export interface ProjectModalProps {
    project: Project | null
    isOpen: boolean
    onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)
    const closeBtnRef = useRef<HTMLButtonElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (!isOpen || !project) return

        // Store active element to return focus on modal close
        previousActiveElement.current = document.activeElement as HTMLElement | null

        // Lock body scrolling
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        // Focus close button on open
        const focusTimeout = setTimeout(() => {
            closeBtnRef.current?.focus()
        }, 50)

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault()
                onClose()
                return
            }

            if (e.key === "Tab") {
                const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
                )
                if (!focusable?.length) return

                const first = focusable[0]
                const last = focusable[focusable.length - 1]
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault()
                    last?.focus()
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault()
                    first?.focus()
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            clearTimeout(focusTimeout)
            document.body.style.overflow = originalOverflow
            window.removeEventListener("keydown", handleKeyDown)
            previousActiveElement.current?.focus?.()
        }
    }, [isOpen, project, onClose])

    if (!isOpen || !project) {
        return null
    }

    const modalContent = (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            aria-describedby="project-modal-description"
            data-testid="project-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 font-jetbrains sm:p-5 md:p-6"
        >
            {/* Backdrop */}
            <button
                type="button"
                tabIndex={-1}
                aria-label="Close backdrop"
                onClick={onClose}
                className="fixed inset-0 cursor-default border-none bg-black/75 backdrop-blur-xl motion-safe:transition-opacity motion-safe:duration-300"
            />

            {/* Modal Window */}
            <div
                ref={modalRef}
                className="relative z-10 h-[min(46rem,calc(100dvh-1.5rem))] w-full max-w-6xl overflow-hidden rounded-[22px] bg-[#0a0a0f]/94 backdrop-blur-2xl sm:h-[min(46rem,calc(100dvh-2.5rem))] md:h-[min(42rem,calc(100dvh-3rem))]"
            >
                <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Close project modal"
                    className="group absolute top-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-zinc-300 outline-none backdrop-blur-md motion-safe:transition-all motion-safe:duration-200 hover:bg-violet-950/80 hover:text-white active:scale-95"
                >
                    <X className="h-5 w-5 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:rotate-90" />
                </button>

                {/* Fixed split layout: no nested scrolling. */}
                <div className="grid h-full min-h-0 grid-rows-[minmax(10rem,0.8fr)_minmax(0,1.2fr)] overflow-hidden md:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] md:grid-rows-1">
                    <div className="min-h-0 overflow-hidden bg-zinc-950">
                        <MediaViewer
                            media={project.media}
                            title={project.title}
                            aspectRatio=""
                            className="h-full !rounded-none !border-0"
                        />
                    </div>

                    <div className="flex min-h-0 flex-col overflow-hidden p-5 sm:p-7 sm:pr-20 md:p-8 md:pr-16 lg:p-10 lg:pr-20">
                        {/* Title and Tech Stack */}
                        <div className="shrink-0">
                            <h2
                                id="project-modal-title"
                                className="text-xl font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl"
                            >
                                {project.title}
                            </h2>

                            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                                {project.tags.slice(0, 4).map((tag) => (
                                    <span key={tag} className="text-[0.66rem] font-medium text-violet-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <p
                            id="project-modal-description"
                            className="mt-5 line-clamp-4 text-xs leading-relaxed text-zinc-300 sm:text-sm md:mt-6"
                        >
                            {project.shortDescription}
                        </p>

                        {/* Grouped Action Links */}
                        {(project.links.liveDemo || project.links.github || project.links.caseStudy) && (
                            <div className="mt-auto flex shrink-0 flex-wrap items-center gap-2 pt-5">
                                {project.links.liveDemo && (
                                    <a
                                        href={project.links.liveDemo}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`Open live demo for ${project.title}`}
                                        className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-violet-600/90 px-4 py-2 text-xs font-semibold text-white outline-none motion-safe:transition-all motion-safe:duration-200 hover:bg-violet-500 active:scale-95"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        <span>Live demo</span>
                                    </a>
                                )}

                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`View GitHub repository for ${project.title}`}
                                        className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white/[0.07] px-4 py-2 text-xs font-semibold text-zinc-200 outline-none motion-safe:transition-all motion-safe:duration-200 hover:bg-white/[0.11] hover:text-white active:scale-95"
                                    >
                                        <Github className="h-3.5 w-3.5" />
                                        <span>Source</span>
                                    </a>
                                )}

                                {project.links.caseStudy && (
                                    <a
                                        href={project.links.caseStudy}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`Read case study for ${project.title}`}
                                        className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-violet-950/30 px-4 py-2 text-xs font-semibold text-violet-300 outline-none motion-safe:transition-all motion-safe:duration-200 hover:bg-violet-950/50 hover:text-violet-100 active:scale-95"
                                    >
                                        <FileText className="h-3.5 w-3.5" />
                                        <span>Case study</span>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    if (typeof document === "undefined") {
        return modalContent
    }

    return createPortal(modalContent, document.body)
}
