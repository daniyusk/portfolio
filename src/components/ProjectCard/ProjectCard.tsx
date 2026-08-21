import { ExternalLink, FileText, Sparkles } from "lucide-react"
import { Github } from "pixelarticons/react/Github"
import { MediaViewer } from "@/components/MediaViewer"
import { cn } from "@/styles/utils"
import type { Project } from "@/types/project"

export interface ProjectCardProps {
    project: Project
    className?: string
    showFeaturedBadge?: boolean
    priority?: boolean
}

export function ProjectCard({ project, className, showFeaturedBadge = true }: ProjectCardProps) {
    const hasLinks = Boolean(project.links.github || project.links.liveDemo || project.links.caseStudy)

    return (
        <article
            data-project-card
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/40 p-4 sm:p-5 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_16px_36px_rgba(124,58,237,0.18)] font-jetbrains",
                className,
            )}
        >
            {/* Top ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-violet-600/20"
            />

            <div className="relative z-10 flex flex-col gap-4">
                {/* Media Container */}
                <div className="relative w-full">
                    <MediaViewer media={project.media} title={project.title} />

                    {showFeaturedBadge && project.isFeatured && (
                        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 rounded-full bg-violet-600/90 px-2.5 py-1 text-[0.7rem] font-bold text-white shadow-md backdrop-blur-md">
                            <Sparkles className="h-3 w-3" />
                            <span>Featured</span>
                        </div>
                    )}
                </div>

                {/* Header: Title & Description */}
                <div className="space-y-2">
                    <h3 className="text-lg font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-violet-300">
                        {project.title}
                    </h3>
                    <p className="text-xs sm:text-[0.82rem] leading-relaxed text-zinc-400">{project.description}</p>
                </div>

                {/* Tech Stack Tags */}
                {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[0.7rem] font-medium text-violet-300 transition-colors duration-150 hover:border-violet-400/40 hover:bg-violet-500/20 hover:text-white"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Actions / Links Bottom Bar */}
            {hasLinks && (
                <div className="relative z-10 mt-5 flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-4">
                    {project.links.liveDemo && (
                        <a
                            href={project.links.liveDemo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View live demo for ${project.title}`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(124,58,237,0.3)] transition-all duration-200 hover:bg-violet-500 hover:shadow-[0_4px_20px_rgba(124,58,237,0.5)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Live Demo</span>
                        </a>
                    )}

                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View GitHub repository for ${project.title}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                        >
                            <Github className="h-4 w-4" />
                            <span>Repository</span>
                        </a>
                    )}

                    {project.links.caseStudy && (
                        <a
                            href={project.links.caseStudy}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Read case study for ${project.title}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/60 bg-transparent px-3 py-1.5 text-xs font-medium text-zinc-400 transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                        >
                            <FileText className="h-3.5 w-3.5" />
                            <span>Case Study</span>
                        </a>
                    )}
                </div>
            )}
        </article>
    )
}
