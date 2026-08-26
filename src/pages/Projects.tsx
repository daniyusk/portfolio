import gsap from "gsap"
import { ArrowLeft } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ContactSection } from "@/components/ContactSection"
import { Dither } from "@/components/Dither"
import { ProjectCarousel } from "@/components/ProjectCarousel"
import { ProjectModal } from "@/components/ProjectModal"
import { getAllProjects } from "@/data/projects"
import type { Project } from "@/types/project"

export function Projects() {
    const pageRef = useRef<HTMLElement>(null)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const allProjects = useMemo(() => getAllProjects(), [])
    const projectCategories = useMemo(
        () =>
            Array.from(new Set(allProjects.map((project) => project.category))).map((category) => ({
                category,
                projects: allProjects.filter((project) => project.category === category),
            })),
        [allProjects],
    )

    // Entrance animation
    useEffect(() => {
        const page = pageRef.current
        if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                "[data-page-reveal]",
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power3.out",
                },
            )
        }, page)

        return () => ctx.revert()
    }, [])

    return (
        <main ref={pageRef} className="relative isolate min-h-screen overflow-x-hidden bg-background text-white">
            <Dither disableAnimation className="!absolute !inset-x-0 !top-0 !bottom-auto h-[46rem] opacity-65" />

            {/* Fade the project intro into the quieter directory surface */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-[31rem] z-[1] h-64 bg-gradient-to-b from-transparent via-background/75 to-background"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
                {/* Navigation Header */}
                <div className="mb-16 flex items-center justify-between sm:mb-24" data-page-reveal>
                    <Link
                        to="/"
                        className="group inline-flex min-h-11 items-center gap-2 rounded-[14px] border border-white/10 bg-zinc-950/45 px-4 py-2 text-xs font-semibold text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-200 hover:border-violet-300/30 hover:bg-violet-950/30 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                        <span>Back to Home</span>
                    </Link>

                    <div className="text-right text-[0.62rem] font-semibold tracking-[0.16em] text-violet-300 uppercase sm:text-xs">
                        <span className="hidden sm:inline">Daniyusk / </span>
                        <span>Projects</span>
                    </div>
                </div>

                {/* Page Title & Description */}
                <div className="mb-14 max-w-3xl sm:mb-20" data-page-reveal>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Projects
                    </h1>

                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                        A comprehensive gallery of frontend systems, distributed backends, 3D WebGL renderers, and
                        developer tooling crafted with modern web technologies.
                    </p>
                </div>

                {/* Category swimlanes */}
                <div data-page-reveal className="mb-28 space-y-14 sm:space-y-16">
                    {projectCategories.length > 0 ? (
                        projectCategories.map(({ category, projects }) => (
                            <ProjectCarousel
                                key={category}
                                category={category}
                                projects={projects}
                                onSelectProject={setSelectedProject}
                            />
                        ))
                    ) : (
                        <div
                            role="status"
                            className="flex min-h-56 items-center justify-center rounded-2xl bg-white/[0.025] px-6 text-center text-sm text-zinc-400 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
                        >
                            No projects registered yet.
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Contact Section */}
            <ContactSection />

            {/* Project Details Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={Boolean(selectedProject)}
                onClose={() => setSelectedProject(null)}
            />
        </main>
    )
}
