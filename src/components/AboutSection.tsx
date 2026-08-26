import { Award, Binary, Code2, Cpu, GraduationCap, Layers, Medal, Terminal } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

export function AboutSection() {
    const containerRef = useScrollReveal<HTMLDivElement>({
        selector: "[data-about-reveal]",
        y: 32,
        scale: 0.97,
        duration: 0.85,
        stagger: 0.1,
    })

    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="relative z-20 w-full overflow-hidden bg-background px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
        >
            {/* Ambient cosmic radial glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(124,58,237,0.06)_0%,transparent_70%)]"
            />

            <div ref={containerRef} className="relative z-10 mx-auto max-w-6xl">
                {/* Section Header */}
                <div data-about-reveal className="mb-12 sm:mb-16">
                    <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1 font-jetbrains text-xs font-semibold text-violet-300">
                        <Code2 aria-hidden="true" className="h-3.5 w-3.5" />
                        <span>About Me</span>
                    </span>
                    <h2
                        id="about-heading"
                        className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
                    >
                        Engineering Systems with Logic &amp; Purpose
                    </h2>
                    <p className="mt-3 max-w-2xl font-sans text-sm text-zinc-400 sm:text-base">
                        Driven by analytical problem solving, mathematical rigor, and modern software architecture.
                    </p>
                </div>

                {/* Main Split Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-stretch">
                    {/* Left Column: Narrative Philosophy & Technical Stack */}
                    <div
                        data-about-reveal
                        className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/60 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/5 backdrop-blur-md sm:p-8 lg:col-span-7"
                    >
                        <div>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-sans text-xl font-bold tracking-tight text-white sm:text-2xl">
                                    Daniel Senzaki
                                </h3>
                                <p className="font-jetbrains text-xs font-medium text-violet-300">
                                    Full-Stack Systems &amp; Computational Logic
                                </p>
                            </div>

                            <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-relaxed">
                                <p>
                                    Currently studying Informatics at{" "}
                                    <span className="font-semibold text-white">COTUCA (UNICAMP)</span>. My engineering
                                    foundation is built on competitive mathematics and algorithmic reasoning,
                                    translating analytical problem-solving into production software.
                                </p>
                                <p>
                                    Focused on scalable TypeScript architectures, resilient backend services, and
                                    high-performance user interfaces built for long-term reliability.
                                </p>
                            </div>
                        </div>

                        {/* Core Engineering Competencies */}
                        <div className="mt-8 border-t border-white/5 pt-6">
                            <ul
                                aria-label="Core competencies and engineering stack"
                                className="flex flex-wrap gap-2 font-jetbrains text-xs text-zinc-300"
                            >
                                <li className="inline-flex cursor-default items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                                    <Terminal aria-hidden="true" className="h-3.5 w-3.5 text-violet-400" />
                                    <span>TypeScript • React • Node.js</span>
                                </li>
                                <li className="inline-flex cursor-default items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                                    <Layers aria-hidden="true" className="h-3.5 w-3.5 text-violet-400" />
                                    <span>Systems Architecture &amp; APIs</span>
                                </li>
                                <li className="inline-flex cursor-default items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                                    <Binary aria-hidden="true" className="h-3.5 w-3.5 text-violet-400" />
                                    <span>Algorithms &amp; Discrete Math</span>
                                </li>
                                <li className="inline-flex cursor-default items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                                    <Cpu aria-hidden="true" className="h-3.5 w-3.5 text-violet-400" />
                                    <span>Reactive UI &amp; Performance</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Academic & Olympiad Proof List (Flattened, no nested cards) */}
                    <div
                        data-about-reveal
                        className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/60 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/5 backdrop-blur-md sm:p-8 lg:col-span-5"
                    >
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex items-center gap-2">
                                <Award aria-hidden="true" className="h-4 w-4 text-violet-400" />
                                <span className="font-jetbrains text-xs font-semibold uppercase tracking-wider text-zinc-300">
                                    Academic &amp; Olympiad Honors
                                </span>
                            </div>
                            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 font-jetbrains text-xs font-medium text-violet-300">
                                Verified
                            </span>
                        </div>

                        {/* Flat list with divider lines instead of nested card boxes */}
                        <div className="divide-y divide-white/5">
                            {/* COTUCA */}
                            <div className="py-4 first:pt-4 last:pb-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-300">
                                            <GraduationCap aria-hidden="true" className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-sans text-sm font-semibold text-white">
                                                COTUCA (UNICAMP)
                                            </h4>
                                            <p className="font-jetbrains text-xs text-zinc-400">
                                                Informatics &amp; Software Development
                                            </p>
                                        </div>
                                    </div>
                                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-jetbrains text-xs font-medium text-emerald-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Active
                                    </span>
                                </div>
                                <p className="mt-1.5 pl-11 text-xs text-zinc-400">
                                    Technical college affiliated with the State University of Campinas.
                                </p>
                            </div>

                            {/* OBMEP */}
                            <div className="py-4 first:pt-4 last:pb-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-300">
                                            <Medal aria-hidden="true" className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-sans text-sm font-semibold text-white">
                                                2x Bronze Medalist
                                            </h4>
                                            <p className="font-jetbrains text-xs text-zinc-400">
                                                OBMEP — National Math Olympiad
                                            </p>
                                        </div>
                                    </div>
                                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-jetbrains text-xs font-medium text-zinc-300">
                                        National
                                    </span>
                                </div>
                                <p className="mt-1.5 pl-11 text-xs text-zinc-400">
                                    Brazilian Mathematical Olympiad for Public Schools.
                                </p>
                            </div>

                            {/* OMASP */}
                            <div className="py-4 first:pt-4 last:pb-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-300">
                                            <Award aria-hidden="true" className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-sans text-sm font-semibold text-white">
                                                Silver Medalist
                                            </h4>
                                            <p className="font-jetbrains text-xs text-zinc-400">
                                                OMASP — São Paulo State Olympiad
                                            </p>
                                        </div>
                                    </div>
                                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-jetbrains text-xs font-medium text-zinc-300">
                                        State
                                    </span>
                                </div>
                                <p className="mt-1.5 pl-11 text-xs text-zinc-400">
                                    São Paulo State Math Olympiad analytical distinction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
