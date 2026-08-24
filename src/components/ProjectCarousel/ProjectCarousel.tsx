import { ArrowLeft, ArrowRight } from "lucide-react"
import { useId, useRef } from "react"
import { ProjectCard } from "@/components/ProjectCard"
import type { Project, ProjectCategory } from "@/types/project"

export interface ProjectCarouselProps {
    category: ProjectCategory
    projects: Project[]
    onSelectProject?: (project: Project) => void
}

export function ProjectCarousel({ category, projects, onSelectProject }: ProjectCarouselProps) {
    const trackRef = useRef<HTMLDivElement>(null)
    const headingId = useId()
    const trackId = useId()

    const move = (direction: -1 | 1) => {
        const track = trackRef.current
        if (!track) return

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        track.scrollBy?.({
            left: direction * Math.max(track.clientWidth * 0.82, 300),
            behavior: reduceMotion ? "auto" : "smooth",
        })
    }

    const focusCard = (currentIndex: number, direction: -1 | 1) => {
        const track = trackRef.current
        if (!track) return

        const cards = Array.from(track.querySelectorAll<HTMLButtonElement>("[data-project-card]"))
        const nextIndex = (currentIndex + direction + cards.length) % cards.length
        const nextCard = cards[nextIndex]
        nextCard?.focus()
        nextCard?.scrollIntoView?.({ behavior: "auto", block: "nearest", inline: "nearest" })
    }

    return (
        <section aria-labelledby={headingId} className="space-y-5">
            <div className="flex items-end justify-between gap-4 px-0.5">
                <div>
                    <h2 id={headingId} className="text-lg font-bold tracking-tight text-white sm:text-xl">
                        {category}
                    </h2>
                    <p className="mt-1 text-[0.68rem] text-zinc-500">
                        {projects.length} {projects.length === 1 ? "project" : "projects"}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => move(-1)}
                        aria-label={`Previous projects in ${category}`}
                        aria-controls={trackId}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-zinc-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] outline-none transition hover:bg-white/[0.11] hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={() => move(1)}
                        aria-label={`Next projects in ${category}`}
                        aria-controls={trackId}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-zinc-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] outline-none transition hover:bg-white/[0.11] hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
            </div>

            <div
                ref={trackRef}
                id={trackId}
                className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-6 [scroll-padding-inline:0.125rem] [scrollbar-width:thin] sm:gap-6"
            >
                {projects.map((project, index) => (
                    <div key={project.id} className="w-[min(84vw,22rem)] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]">
                        <ProjectCard
                            project={project}
                            onSelect={onSelectProject}
                            onNavigate={(direction) => focusCard(index, direction)}
                            className="h-full"
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
