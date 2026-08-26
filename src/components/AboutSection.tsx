import { Binary, Cpu, Layers, Terminal } from "lucide-react"
import { CotucaLogo, ObmepLogo, OmaspLogo } from "@/components/icons/InstitutionLogos"
import { useScrollReveal } from "@/hooks/useScrollReveal"

export function AboutSection() {
    const containerRef = useScrollReveal<HTMLDivElement>({
        selector: "[data-about-reveal]",
        y: 28,
        scale: 0.98,
        duration: 0.8,
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
                {/* Section Title */}
                <div data-about-reveal className="mb-10 sm:mb-14">
                    <h2
                        id="about-heading"
                        className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
                    >
                        About Me
                    </h2>
                </div>

                {/* Personal Presentation & Bio */}
                <div data-about-reveal className="space-y-6 sm:space-y-8">
                    <div>
                        <h3 className="font-sans text-xl font-bold tracking-tight text-white sm:text-2xl">
                            Daniel Senzaki
                        </h3>
                        <p className="mt-1 font-jetbrains text-xs font-medium text-violet-300">
                            Full-Stack Systems &amp; Computational Logic
                        </p>
                    </div>

                    <div className="max-w-3xl space-y-4 font-sans text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-relaxed">
                        <p>
                            Currently studying Informatics at{" "}
                            <span className="font-semibold text-white">COTUCA (UNICAMP)</span>. My engineering
                            foundation is built on competitive mathematics and algorithmic reasoning, translating
                            analytical problem-solving into production software.
                        </p>
                        <p>
                            Focused on scalable TypeScript architectures, resilient backend services, and
                            high-performance user interfaces built for long-term reliability.
                        </p>
                    </div>

                    {/* Core Engineering Competencies */}
                    <div className="pt-2">
                        <ul
                            aria-label="Core competencies and engineering stack"
                            className="flex flex-wrap gap-2 font-jetbrains text-xs text-zinc-300"
                        >
                            <li className="inline-flex cursor-default items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
                                <Terminal aria-hidden="true" className="h-3.5 w-3.5 text-violet-400" />
                                <span>TypeScript • React • Node.js</span>
                            </li>
                            <li className="inline-flex cursor-default items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
                                <Layers aria-hidden="true" className="h-3.5 w-3.5 text-violet-400" />
                                <span>Systems Architecture &amp; APIs</span>
                            </li>
                            <li className="inline-flex cursor-default items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
                                <Binary aria-hidden="true" className="h-3.5 w-3.5 text-violet-400" />
                                <span>Algorithms &amp; Discrete Math</span>
                            </li>
                            <li className="inline-flex cursor-default items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
                                <Cpu aria-hidden="true" className="h-3.5 w-3.5 text-violet-400" />
                                <span>Reactive UI &amp; Performance</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Subtle Divider Line */}
                <div data-about-reveal className="my-10 sm:my-14">
                    <hr className="border-0 border-t border-white/10" />
                </div>

                {/* Academic Background & Olympiad Honors */}
                <div data-about-reveal className="space-y-6 sm:space-y-8">
                    <h3 className="font-jetbrains text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Academic &amp; Olympiad Background
                    </h3>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {/* COTUCA */}
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                    <CotucaLogo className="h-5 w-5 shrink-0 text-violet-400" />
                                    <h4 className="font-sans text-sm font-semibold text-white">COTUCA (UNICAMP)</h4>
                                </div>
                                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-jetbrains text-xs font-medium text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Current
                                </span>
                            </div>
                            <p className="font-jetbrains text-xs text-zinc-400">
                                Informatics &amp; Software Development
                            </p>
                            <p className="text-xs leading-relaxed text-zinc-400">
                                Technical college affiliated with the State University of Campinas.
                            </p>
                        </div>

                        {/* OBMEP */}
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-2.5">
                                <ObmepLogo className="h-5 w-5 shrink-0 text-violet-400" />
                                <h4 className="font-sans text-sm font-semibold text-white">2x Bronze Medalist</h4>
                            </div>
                            <p className="font-jetbrains text-xs text-zinc-400">OBMEP — National Math Olympiad</p>
                            <p className="text-xs leading-relaxed text-zinc-400">
                                Brazilian Mathematical Olympiad for Public Schools.
                            </p>
                        </div>

                        {/* OMASP */}
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-2.5">
                                <OmaspLogo className="h-5 w-5 shrink-0 text-violet-400" />
                                <h4 className="font-sans text-sm font-semibold text-white">Silver Medalist</h4>
                            </div>
                            <p className="font-jetbrains text-xs text-zinc-400">OMASP — São Paulo State Olympiad</p>
                            <p className="text-xs leading-relaxed text-zinc-400">
                                São Paulo State Math Olympiad analytical distinction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
