import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { AccordionGallery } from "@/components/AccordionGallery"
import { ButtonLink } from "@/components/Buttons"
import { ProjectModal } from "@/components/ProjectModal"
import { getFeaturedProjects } from "@/data/projects"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import type { Project } from "@/types/project"

export function FeaturedProjectsSection() {
    const headerRef = useScrollReveal<HTMLDivElement>({
        selector: "[data-featured-reveal]",
        y: 36,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.12,
        threshold: 0.15,
    })
    const featuredProjects = getFeaturedProjects()

    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    return (
        <section
            id="projects"
            aria-labelledby="featured-projects-title"
            className="relative z-20 min-h-screen w-full bg-background px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
        >
            {/* Full-width top gradient fade transitioning from Dither Hero into dark background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 inset-x-0 h-40 w-full bg-gradient-to-b from-transparent via-background/75 to-background"
            />

            {/* Ambient Background Glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
            >
                <div className="h-[36rem] w-[54rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.08)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className="mb-10 flex flex-col items-start justify-between gap-7 border-b border-white/10 pb-8 sm:mb-12 sm:flex-row sm:items-end"
                >
                    <div className="max-w-2xl" data-featured-reveal>
                        <h2
                            id="featured-projects-title"
                            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
                        >
                            Featured Projects
                        </h2>
                        <p className="mt-4 max-w-xl text-xs leading-relaxed text-zinc-400 sm:text-sm">
                            A selection of projects crafted by me, spanning from interactive games to full-scale
                            software systems.
                        </p>
                    </div>

                    <div data-featured-reveal className="w-full sm:w-auto">
                        <ButtonLink
                            href="/projects"
                            variant="secondary"
                            className="w-full min-h-11 whitespace-nowrap text-xs sm:w-auto sm:text-sm"
                        >
                            <span>View all projects</span>
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </ButtonLink>
                    </div>
                </div>

                {/* ReactBits 3D Accordion Gallery Showcase */}
                {featuredProjects.length > 0 && (
                    <div data-featured-reveal>
                        <AccordionGallery
                            projects={featuredProjects}
                            defaultIndex={0}
                            accentColor="#a78bfa"
                            overlayColor="#09090b"
                            height={470}
                            gap={10}
                            radius={18}
                            expandRatio={0.58}
                            tilt={3}
                            parallax={0.35}
                            duration={0.65}
                            ease="power3.out"
                            trigger="hover"
                            showLabels={true}
                            grayscale={true}
                            onSelectProject={(project) => setSelectedProject(project)}
                        />
                    </div>
                )}
            </div>

            {/* Project Details Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={Boolean(selectedProject)}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    )
}
