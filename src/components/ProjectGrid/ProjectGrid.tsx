import gsap from "gsap"
import { FolderCode } from "lucide-react"
import { useEffect, useRef } from "react"
import { ProjectCard } from "@/components/ProjectCard"
import { cn } from "@/styles/utils"
import type { Project } from "@/types/project"

export interface ProjectGridProps {
    projects: Project[]
    columns?: 2 | 3
    className?: string
    showFeaturedBadge?: boolean
    emptyMessage?: string
}

export function ProjectGrid({
    projects,
    columns = 3,
    className,
    showFeaturedBadge = true,
    emptyMessage = "No projects found matching your criteria.",
}: ProjectGridProps) {
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const grid = gridRef.current
        if (
            !grid ||
            projects.length === 0 ||
            typeof window === "undefined" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return
        }

        const cards = grid.querySelectorAll("[data-project-card]")
        if (!cards.length) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cards,
                { opacity: 0, y: 30, scale: 0.96 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    clearProps: "transform",
                },
            )
        }, grid)

        return () => ctx.revert()
    }, [projects])

    if (projects.length === 0) {
        return (
            <div
                data-testid="empty-projects-state"
                className="flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/30 p-8 text-center font-jetbrains"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-950/40 border border-violet-800/30 text-violet-300">
                    <FolderCode className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-medium text-zinc-300">{emptyMessage}</p>
                <p className="mt-1 text-xs text-zinc-500">
                    Try adjusting your search query or selecting a different technology tag.
                </p>
            </div>
        )
    }

    return (
        <div
            ref={gridRef}
            className={cn(
                "grid w-full gap-6 sm:gap-8",
                columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                className,
            )}
        >
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} showFeaturedBadge={showFeaturedBadge} />
            ))}
        </div>
    )
}
