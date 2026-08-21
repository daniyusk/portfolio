import gsap from "gsap"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { SpecularButton } from "@/components/Buttons"
import { ProjectGrid } from "@/components/ProjectGrid"
import { getFeaturedProjects } from "@/data/projects"

export function FeaturedProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const featuredProjects = getFeaturedProjects()

    useEffect(() => {
        const section = sectionRef.current
        const header = headerRef.current
        if (
            !section ||
            !header ||
            typeof window === "undefined" ||
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    gsap.fromTo(
                        "[data-featured-reveal]",
                        { opacity: 0, y: 36, scale: 0.96 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            stagger: 0.12,
                            ease: "power3.out",
                            clearProps: "transform",
                        },
                    )
                }
            },
            { threshold: 0.15 },
        )

        observer.observe(section)

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="projects"
            aria-labelledby="featured-projects-title"
            className="relative z-20 w-full bg-background min-h-screen py-24 sm:py-32 px-5 sm:px-8 lg:px-12 font-jetbrains"
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
                    className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end border-b border-white/10 pb-8"
                >
                    <div className="space-y-3" data-featured-reveal>
                        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Selected Work</span>
                        </div>
                        <h2
                            id="featured-projects-title"
                            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white"
                        >
                            Featured Projects
                        </h2>
                        <p className="max-w-xl text-xs sm:text-sm text-zinc-400">
                            A curated selection of production apps, open-source libraries, and interactive engineering
                            experiments.
                        </p>
                    </div>

                    <div data-featured-reveal className="w-full sm:w-auto">
                        <Link
                            to="/projects"
                            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:border-violet-500/50 hover:bg-violet-600/20 hover:text-violet-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                        >
                            <span>View all projects</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Featured Projects Grid */}
                <div data-featured-reveal>
                    <ProjectGrid projects={featuredProjects} columns={3} showFeaturedBadge={false} />
                </div>

                {/* Bottom CTA Banner */}
                <div
                    data-featured-reveal
                    className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-zinc-950/40 p-8 text-center backdrop-blur-xl sm:flex-row sm:text-left"
                >
                    <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-bold text-white">
                            Looking for more experiments & repositories?
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400">
                            Explore the complete catalog with tags, interactive media previews, and live architectures.
                        </p>
                    </div>
                    <Link to="/projects">
                        <SpecularButton
                            size="md"
                            radius={12}
                            textColor="#ffffff"
                            lineColor="#c4b5fd"
                            baseColor="#7c3aed"
                            className="whitespace-nowrap font-jetbrains text-xs sm:text-sm"
                        >
                            <span className="flex items-center gap-2">
                                <span>View all projects</span>
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </SpecularButton>
                    </Link>
                </div>
            </div>
        </section>
    )
}
