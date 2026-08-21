import gsap from "gsap"
import { ArrowLeft, Code2, Layers, RotateCcw, Search, Sparkles, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ButtonLink } from "@/components/Buttons"
import { ContactSection } from "@/components/ContactSection"
import { Dither } from "@/components/Dither"
import { ProjectGrid } from "@/components/ProjectGrid"
import { getAllProjects, getAllTags } from "@/data/projects"

export function Projects() {
    const pageRef = useRef<HTMLElement>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

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
                project.description.toLowerCase().includes(query) ||
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
            <Dither />

            {/* Background glowing gradients */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(124,58,237,0.12)_0%,transparent_60%)]"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
                {/* Navigation Header */}
                <div className="mb-10 flex items-center justify-between" data-page-reveal>
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-2 text-xs font-semibold text-zinc-300 backdrop-blur-md transition-all duration-200 hover:border-violet-500/40 hover:bg-zinc-900/60 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                        <span>Back to Home</span>
                    </Link>

                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                        <Code2 className="h-3.5 w-3.5" />
                        <span>Projects Directory</span>
                    </div>
                </div>

                {/* Page Title & Description */}
                <div className="mb-12 space-y-4 max-w-3xl" data-page-reveal>
                    <div className="inline-flex items-center gap-2 rounded-md bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-400 border border-white/10">
                        <Layers className="h-3.5 w-3.5 text-violet-400" />
                        <span>Architectures & Open Source</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                        All Projects & Experiments
                    </h1>

                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                        A comprehensive gallery of frontend systems, distributed backends, 3D WebGL renderers, and
                        developer tooling crafted with modern web technologies.
                    </p>
                </div>

                {/* Search & Tag Filter Toolbar */}
                <div
                    data-page-reveal
                    className="mb-10 flex flex-col gap-6 rounded-2xl border border-white/10 bg-zinc-950/60 p-5 backdrop-blur-xl sm:p-6"
                >
                    {/* Search Input and Counter */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by title, description, or stack..."
                                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition-colors duration-200 focus:border-violet-500/60 focus:bg-zinc-900 focus:ring-2 focus:ring-violet-500/20"
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

                        <div className="flex items-center gap-3 text-xs text-zinc-400">
                            <span>
                                Showing <strong className="text-white font-semibold">{filteredProjects.length}</strong>{" "}
                                of <strong className="text-white font-semibold">{allProjects.length}</strong> projects
                            </span>

                            {(selectedTag || searchQuery) && (
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    <RotateCcw className="h-3 w-3" />
                                    <span>Reset</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tag Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                        <span className="text-xs font-semibold text-zinc-400 mr-1">Tags:</span>

                        <button
                            type="button"
                            onClick={() => setSelectedTag(null)}
                            className={`rounded-lg px-3 py-1 text-xs font-medium transition-all duration-200 ${
                                selectedTag === null
                                    ? "bg-violet-600 text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                                    : "border border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
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
                                    className={`rounded-lg px-3 py-1 text-xs font-medium transition-all duration-200 ${
                                        isSelected
                                            ? "bg-violet-600 text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                                            : "border border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300"
                                    }`}
                                >
                                    {tag} ({count})
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Main Projects Grid */}
                <div data-page-reveal className="mb-20">
                    <ProjectGrid
                        projects={filteredProjects}
                        columns={3}
                        showFeaturedBadge={true}
                        emptyMessage={
                            searchQuery || selectedTag
                                ? `No projects found matching "${searchQuery || selectedTag}".`
                                : "No projects registered yet."
                        }
                    />
                </div>

                {/* CTA Box back to Home & Contact */}
                <div
                    data-page-reveal
                    className="mb-24 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-950/80 via-zinc-900/60 to-zinc-950/80 p-8 backdrop-blur-xl sm:flex-row"
                >
                    <div className="space-y-1 text-center sm:text-left">
                        <div className="inline-flex items-center gap-1.5 text-xs text-violet-400 font-semibold mb-1">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Collaboration & Inquiries</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                            Have an idea or custom project in mind?
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                            Feel free to reach out via GitHub, LinkedIn, or Discord to discuss architecture, frontend
                            development, or open-source initiatives.
                        </p>
                    </div>

                    <ButtonLink href="/#contact" variant="primary" className="whitespace-nowrap">
                        Get in Touch
                    </ButtonLink>
                </div>
            </div>

            {/* Footer Contact Section */}
            <ContactSection />
        </main>
    )
}
