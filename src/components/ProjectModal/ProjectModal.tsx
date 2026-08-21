import { ExternalLink, FileText, X } from "lucide-react"
import { Github } from "pixelarticons/react/Github"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { MediaViewer } from "@/components/MediaViewer"
import { cn } from "@/styles/utils"
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
                    'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
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
            className="fixed inset-0 z-50 flex items-center justify-center p-3 font-jetbrains sm:p-5 md:p-8"
        >
            {/* Backdrop */}
            <button
                type="button"
                tabIndex={-1}
                aria-label="Close backdrop"
                onClick={onClose}
                className="fixed inset-0 cursor-default border-none bg-black/80 backdrop-blur-xl transition-opacity duration-300"
            />

            {/* Modal Window */}
            <div
                ref={modalRef}
                className={cn(
                    "relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[20px] border border-white/15 bg-[#0a0a0f]/95 shadow-[0_30px_100px_rgba(0,0,0,0.88)] backdrop-blur-2xl",
                )}
            >
                {/* Modal Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-7 sm:py-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[0.64rem] font-semibold tracking-[0.16em] text-violet-300 uppercase">
                            {project.isFeatured ? "Featured project" : "Project archive"}
                        </span>
                        <span aria-hidden="true" className="text-zinc-700">
                            /
                        </span>
                        <span className="font-mono text-[0.64rem] text-zinc-500">{project.id}</span>
                    </div>

                    <button
                        ref={closeBtnRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close project modal"
                        className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-transparent text-zinc-400 transition-all duration-200 hover:border-violet-300/40 hover:bg-violet-950/35 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                    >
                        <X className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
                    </button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="grid flex-1 overflow-y-auto lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)]">
                    {/* Media Viewer Component */}
                    <div className="border-b border-white/10 p-4 sm:p-6 lg:border-r lg:border-b-0 lg:p-7">
                        <div className="overflow-hidden rounded-[14px] border border-white/10 bg-zinc-950 shadow-2xl">
                            <MediaViewer media={project.media} title={project.title} aspectRatio="aspect-video" />
                        </div>
                    </div>

                    <div className="flex flex-col p-5 sm:p-7">
                        {/* Title and Tech Stack */}
                        <div>
                            <h2
                                id="project-modal-title"
                                className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl"
                            >
                                {project.title}
                            </h2>

                            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="text-[0.68rem] font-medium text-violet-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Full In-Depth Description */}
                        <div className="mt-7 space-y-3 border-t border-white/10 pt-6">
                            <h3 className="text-[0.65rem] font-semibold tracking-[0.16em] text-zinc-500 uppercase">
                                Overview & Architecture
                            </h3>
                            <p
                                id="project-modal-description"
                                className="whitespace-pre-line text-sm leading-relaxed text-zinc-300"
                            >
                                {project.fullDescription}
                            </p>
                        </div>

                        {/* Grouped Action Links */}
                        {(project.links.liveDemo || project.links.github || project.links.caseStudy) && (
                            <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-white/10 pt-6 lg:mt-8">
                                {project.links.liveDemo && (
                                    <a
                                        href={project.links.liveDemo}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`Open live demo for ${project.title}`}
                                        className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-violet-600/90 px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-violet-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
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
                                        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-200 transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
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
                                        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-950/25 px-4 py-2 text-xs font-semibold text-violet-300 transition-all duration-200 hover:border-violet-300/40 hover:text-violet-100 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
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
