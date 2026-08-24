import { ArrowUpRight } from "lucide-react"
import { ProjectMediaPreview } from "@/components/ProjectMediaPreview"
import { cn } from "@/styles/utils"
import type { Project } from "@/types/project"

export interface ProjectCardProps {
    project: Project
    onSelect?: (project: Project) => void
    onNavigate?: (direction: -1 | 1) => void
    className?: string
}

export function ProjectCard({ project, onSelect, onNavigate, className }: ProjectCardProps) {
    const primaryMedia = project.media[0]

    const handleClick = () => {
        onSelect?.(project)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault()
            onNavigate?.(e.key === "ArrowRight" ? 1 : -1)
            return
        }

        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onSelect?.(project)
        }
    }

    return (
        <button
            type="button"
            data-project-card
            data-project-preview-trigger
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-label={`View details for ${project.title}`}
            className={cn(
                "group relative flex w-full cursor-pointer select-none flex-col overflow-hidden rounded-[20px] bg-zinc-950/70 text-left shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_18px_45px_rgba(0,0,0,0.2)] outline-none backdrop-blur-xl motion-safe:transition-all motion-safe:duration-300",
                "motion-safe:hover:-translate-y-1 hover:bg-zinc-950/85 hover:shadow-[inset_0_0_0_1px_rgba(196,181,253,0.2),0_24px_58px_rgba(76,29,149,0.14)]",
                "focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-4 focus-visible:ring-offset-background font-jetbrains",
                className,
            )}
        >
            {/* Quiet ambient response */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-violet-600/0 blur-3xl transition-colors duration-300 group-hover:bg-violet-600/10"
            />

            <div className="relative z-10 flex flex-1 flex-col">
                {/* Full-bleed visual asset */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                    {primaryMedia ? (
                        <ProjectMediaPreview media={primaryMedia} title={project.title} />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-zinc-600 text-xs">
                            No preview
                        </div>
                    )}

                    {/* Subtle Overlay gradient on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/45 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-10" />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                    {/* Title & Short Description */}
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-base font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-violet-200 sm:text-lg">
                                {project.title}
                            </h3>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-300" />
                        </div>

                        <p className="text-xs sm:text-[0.82rem] leading-relaxed text-zinc-400 line-clamp-3">
                            {project.shortDescription}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    {project.tags.length > 0 && (
                        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1.5 pt-5">
                            {project.tags.slice(0, 4).map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center text-[0.66rem] font-medium text-violet-300"
                                >
                                    {tag}
                                </span>
                            ))}
                            {project.tags.length > 4 && (
                                <span className="inline-flex items-center text-[0.65rem] text-zinc-500">
                                    +{project.tags.length - 4}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </button>
    )
}
