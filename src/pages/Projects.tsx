import gsap from "gsap"
import { ArrowLeft, RotateCcw, Search, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ContactSection } from "@/components/ContactSection"
import { Dither } from "@/components/Dither"
import { ProjectGrid } from "@/components/ProjectGrid"
import { ProjectModal } from "@/components/ProjectModal"
import { getAllProjects, getAllTags } from "@/data/projects"
import type { Project } from "@/types/project"

export function Projects() {
    const pageRef = useRef<HTMLElement>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const allProjects = useMemo(() => getAllProjects(), [])
    const allTags = useMemo(() => getAllTags(), [])

    // Filter projects based on search and selected tag
    const filteredProjects = useMemo(() => {
        return allProjects.filter((project) => {
            const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true
            const query = searchQuery.trim().toLowerCase()
            const matchesSearch =
                query === "" ||
                project.title.toLowerCase().includes(query) ||
                project.shortDescription.toLowerCase().includes(query) ||
                project.fullDescription.toLowerCase().includes(query) ||
                project.tags.some((tag) => tag.toLowerCase().includes(query))

            return matchesTag && matchesSearch
        })
    }, [allProjects, selectedTag, searchQuery])

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

    const handleClearFilters = () => {
        setSearchQuery("")
        setSelectedTag(null)
    }

    return (
        <main
            ref={pageRef}
            className="relative isolate min-h-screen overflow-x-hidden bg-background font-jetbrains text-white"
        >
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
                    <div className="mb-5 flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.2em] text-violet-300 uppercase">
                        <span>02</span>
                        <span aria-hidden="true" className="h-px w-10 bg-violet-400/60" />
                        <span>Project archive</span>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        All Projects & Experiments
                    </h1>

                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                        A comprehensive gallery of frontend systems, distributed backends, 3D WebGL renderers, and
                        developer tooling crafted with modern web technologies.
                    </p>
                </div>

                {/* Search & Tag Filter Toolbar */}
                <div
                    data-page-reveal
                    className="mb-10 flex flex-col gap-5 border-y border-white/10 bg-background/65 py-5 backdrop-blur-xl sm:py-6"
                >
                    {/* Search Input and Counter */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative max-w-lg flex-1">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by title, description, or stack..."
                                className="w-full rounded-[14px] border border-white/10 bg-zinc-950/65 py-3 pl-10 pr-10 text-xs text-white outline-none transition-colors duration-200 placeholder:text-zinc-600 focus:border-violet-300/40 focus:bg-zinc-950 focus:ring-2 focus:ring-violet-500/15 sm:text-sm"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    aria-label="Clear search query"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-3 text-xs text-zinc-500 sm:justify-end">
                            <span>
                                Showing <strong className="text-white font-semibold">{filteredProjects.length}</strong>{" "}
                                of <strong className="text-white font-semibold">{allProjects.length}</strong> projects
                            </span>

                            {(selectedTag || searchQuery) && (
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="inline-flex items-center gap-1.5 border-b border-white/20 px-1 py-1 text-xs text-zinc-300 transition-colors hover:border-violet-300/60 hover:text-white"
                                >
                                    <RotateCcw className="h-3 w-3" />
                                    <span>Reset</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tag Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto border-t border-white/10 pt-4 pb-1 md:flex-wrap md:overflow-visible">
                        <span className="mr-1 shrink-0 text-[0.65rem] font-semibold tracking-[0.14em] text-zinc-500 uppercase">
                            Filter
                        </span>

                        <button
                            type="button"
                            onClick={() => setSelectedTag(null)}
                            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                                selectedTag === null
                                    ? "bg-violet-600/90 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                                    : "border border-white/10 bg-zinc-950/55 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                            }`}
                        >
                            All ({allProjects.length})
                        </button>

                        {allTags.map((tag) => {
                            const count = allProjects.filter((p) => p.tags.includes(tag)).length
                            const isSelected = selectedTag === tag

                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setSelectedTag(isSelected ? null : tag)}
                                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                                        isSelected
                                            ? "bg-violet-600/90 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                                            : "border border-white/10 bg-zinc-950/55 text-zinc-400 hover:border-violet-300/30 hover:bg-violet-950/25 hover:text-violet-200"
                                    }`}
                                >
                                    {tag} ({count})
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Main Projects Grid */}
                <div data-page-reveal className="mb-28">
                    <ProjectGrid
                        projects={filteredProjects}
                        columns={3}
                        showFeaturedBadge={true}
                        onSelectProject={setSelectedProject}
                        emptyMessage={
                            searchQuery || selectedTag
                                ? `No projects found matching "${searchQuery || selectedTag}".`
                                : "No projects registered yet."
                        }
                    />
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
