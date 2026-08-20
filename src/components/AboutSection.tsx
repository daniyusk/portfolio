import gsap from "gsap"
import { Code2, GraduationCap, Sparkles, Trophy } from "lucide-react"
import { useEffect, useRef } from "react"

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const content = contentRef.current
        if (
            !section ||
            !content ||
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
                        "[data-about-element]",
                        { opacity: 0, y: 32, scale: 0.97 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.85,
                            stagger: 0.12,
                            ease: "power3.out",
                            clearProps: "transform",
                        },
                    )
                }
            },
            { threshold: 0.2 },
        )

        observer.observe(section)

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="about"
            aria-labelledby="about-heading"
            className="relative z-20 w-full overflow-hidden bg-background px-5 py-20 font-jetbrains sm:px-8 lg:px-12"
        >
            {/* Soft ambient cosmic glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(124,58,237,0.06)_0%,transparent_70%)]"
            />

            <div ref={contentRef} className="relative z-10 mx-auto max-w-4xl">
                {/* Section Header */}
                <div data-about-element className="mb-8 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-300">
                        <Code2 aria-hidden="true" className="h-3.5 w-3.5" />
                        <span>About me</span>
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                {/* Content Card */}
                <div
                    data-about-element
                    className="relative rounded-2xl border border-white/10 bg-zinc-950/50 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] ring-1 ring-white/5 backdrop-blur-md sm:p-10"
                >
                    <h2
                        id="about-heading"
                        className="mb-6 text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl"
                    >
                        Engineering systems with logic &amp; purpose.
                    </h2>

                    <div className="space-y-6 text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-relaxed">
                        <p>
                            Full Stack Developer currently studying Informatics at{" "}
                            <span className="font-semibold text-white">COTUCA (UNICAMP)</span>. My journey in
                            programming is driven by sharp analytical reasoning, proven by achievements such as being a{" "}
                            <span className="font-medium text-violet-300">2x bronze medalist at OBMEP</span> and a{" "}
                            <span className="font-medium text-violet-300">silver medalist at OMASP</span>.
                        </p>

                        <p>
                            I don&apos;t just see code as lines to deliver, but as architecture: focused on creating
                            systems that evolve over time, bridging functional user interfaces with resilient and
                            scalable backends. I value efficient solutions, clean code, and projects built to generate
                            long-term impact.
                        </p>
                    </div>

                    {/* Highlights row */}
                    <div className="mt-8 flex flex-wrap gap-2.5 border-t border-white/5 pt-6 text-xs text-zinc-400">
                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5">
                            <GraduationCap aria-hidden="true" className="h-3.5 w-3.5 text-violet-400" />
                            <span>COTUCA (UNICAMP) • Informatics</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5">
                            <Trophy aria-hidden="true" className="h-3.5 w-3.5 text-yellow-400/90" />
                            <span>OBMEP &amp; OMASP Medalist</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5">
                            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-violet-300" />
                            <span>Full Stack &amp; Architecture</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
