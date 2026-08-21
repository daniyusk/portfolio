import { ArrowUpRight } from "lucide-react"
import { cn } from "@/styles/utils"
import type { Project } from "@/types/project"

export interface ProjectCardProps {
    project: Project
    index?: number
    onSelect?: (project: Project) => void
    className?: string
    showFeaturedBadge?: boolean
    priority?: boolean
}

export function ProjectCard({ project, index, onSelect, className, showFeaturedBadge = true }: ProjectCardProps) {
    const primaryMedia = project.media[0]
    const projectNumber = String((index ?? 0) + 1).padStart(2, "0")

    const handleClick = () => {
        onSelect?.(project)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onSelect?.(project)
        }
    }

    return (
        <button
            type="button"
            data-project-card
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-label={`View details for ${project.title}`}
            className={cn(
                "group relative flex w-full cursor-pointer select-none flex-col justify-between overflow-hidden rounded-[18px] border border-white/10 bg-zinc-950/65 p-3.5 text-left shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 sm:p-4",
                "hover:-translate-y-1 hover:border-violet-400/35 hover:bg-zinc-950/80 hover:shadow-[0_22px_55px_rgba(76,29,149,0.14)]",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 font-jetbrains",
                className,
            )}
        >
            {/* Quiet ambient response */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-violet-600/0 blur-3xl transition-colors duration-300 group-hover:bg-violet-600/10"
            />

            <div className="relative z-10 flex flex-col gap-4">
                {/* Visual Asset Container */}
                <div className="relative aspect-video w-full overflow-hidden rounded-[13px] border border-white/10 bg-zinc-950 shadow-inner">
                    {primaryMedia ? (
                        primaryMedia.type === "video" && !primaryMedia.thumbnailUrl ? (
                            <video
                                src={primaryMedia.url}
                                muted
                                playsInline
                                preload="metadata"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <img
                                src={primaryMedia.thumbnailUrl || primaryMedia.url}
                                alt={primaryMedia.alt || project.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        )
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-zinc-600 text-xs">
                            No preview
                        </div>
                    )}

                    {/* Subtle Overlay gradient on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/45 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-10" />
                </div>

                {/* Title & Short Description */}
                <div className="space-y-2 px-0.5">
                    <div className="flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.15em] text-zinc-500 uppercase">
                        <span className="text-violet-300">{projectNumber}</span>
                        <span aria-hidden="true">/</span>
                        <span>
                            {showFeaturedBadge && project.isFeatured ? "Featured" : primaryMedia?.type || "Project"}
                        </span>
                    </div>
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
            </div>

            {/* Tech Stack Badges */}
            {project.tags.length > 0 && (
                <div className="relative z-10 mt-4 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-white/10 px-0.5 pt-3">
                    {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="inline-flex items-center text-[0.66rem] font-medium text-violet-300">
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
        </button>
    )
}
