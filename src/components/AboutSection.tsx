import { ArrowUpRight, Binary, Layers, Terminal } from "lucide-react"
import { CotucaLogo, ObmepLogo, OmaspLogo } from "@/components/icons/InstitutionLogos"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const externalProofLink =
    "inline-flex min-h-11 items-center gap-1.5 rounded-md px-1 font-jetbrains text-sm font-medium text-violet-200 underline decoration-violet-400/50 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"

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
            className="relative z-20 w-full bg-background px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_46%_at_58%_48%,rgba(124,58,237,0.075)_0%,transparent_72%)]"
            />

            <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl">
                <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:gap-16 xl:gap-24">
                    <div data-about-reveal className="min-w-0">
                        <header className="max-w-3xl">
                            <h2
                                id="about-heading"
                                className="text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
                            >
                                Daniel Senzaki
                            </h2>
                            <p className="mt-4 max-w-2xl text-lg font-semibold leading-snug text-violet-200 sm:text-xl">
                                Systems-focused developer building game systems and reactive interfaces.
                            </p>
                        </header>

                        <div className="mt-8 max-w-[68ch] space-y-4 text-base leading-7 text-zinc-300">
                            <p>
                                I study Informatics and Software Development at{" "}
                                <span className="font-semibold text-white">COTUCA (UNICAMP)</span>, bringing the
                                discipline of competitive mathematics to complex software problems.
                            </p>
                            <p>
                                My recent work includes the crafting architecture and reactive UI for{" "}
                                <span className="font-semibold text-white">Project: FAR</span>, plus a combat-system
                                refactor for <span className="font-semibold text-white">Steal a Garden</span>.
                            </p>
                        </div>

                        <ul
                            aria-label="Core competencies and engineering stack"
                            className="mt-8 flex flex-wrap gap-2.5 text-sm text-zinc-200"
                        >
                            <li className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2">
                                <Terminal aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-300" />
                                <span>TypeScript · React · Node.js</span>
                            </li>
                            <li className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2">
                                <Layers aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-300" />
                                <span>Game systems · APIs</span>
                            </li>
                            <li className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2">
                                <Binary aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-300" />
                                <span>Reactive UI · Algorithms</span>
                            </li>
                        </ul>

                        <div className="mt-10 max-w-3xl border-t border-white/10 pt-7">
                            <h3 className="text-base font-bold tracking-tight text-white">Selected work</h3>
                            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                                <div className="min-w-0">
                                    <dt className="font-jetbrains text-sm font-semibold text-violet-200">
                                        Project: FAR
                                    </dt>
                                    <dd className="mt-1.5 text-sm leading-6 text-zinc-300">
                                        Crafting architecture, reactive menus, and localized interface states.
                                    </dd>
                                </div>
                                <div className="min-w-0">
                                    <dt className="font-jetbrains text-sm font-semibold text-violet-200">
                                        Steal a Garden
                                    </dt>
                                    <dd className="mt-1.5 text-sm leading-6 text-zinc-300">
                                        Combat-system refactoring, hit feedback, and player interactions.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <aside
                        data-about-reveal
                        aria-labelledby="academic-heading"
                        className="min-w-0 rounded-2xl border border-white/10 bg-zinc-950/55 p-5 sm:p-7 lg:p-8"
                    >
                        <h3 id="academic-heading" className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                            Academic proof
                        </h3>

                        <div className="mt-7 grid grid-cols-[3rem_minmax(0,1fr)] gap-4 sm:grid-cols-[3.5rem_minmax(0,1fr)]">
                            <CotucaLogo className="h-12 w-12 shrink-0 text-violet-300 sm:h-14 sm:w-14" />
                            <div className="min-w-0">
                                <h4 className="text-base font-bold text-white sm:text-lg">COTUCA (UNICAMP)</h4>
                                <p className="mt-1 text-sm leading-6 text-zinc-300">
                                    Informatics and Software Development
                                </p>
                                <p className="mt-2 font-jetbrains text-sm font-medium text-violet-200">
                                    Currently studying
                                </p>
                            </div>
                        </div>

                        <div className="my-7 h-px bg-white/10" />

                        <div>
                            <h4 className="text-base font-bold text-white">Olympiad distinctions</h4>

                            <div className="mt-6 grid grid-cols-[3rem_minmax(0,1fr)] gap-4 sm:grid-cols-[3.5rem_minmax(0,1fr)]">
                                <ObmepLogo className="h-12 w-12 shrink-0 text-violet-300 sm:h-14 sm:w-14" />
                                <div className="min-w-0">
                                    <h5 className="text-base font-bold text-white">OBMEP</h5>
                                    <p className="mt-1 text-sm leading-6 text-zinc-200">
                                        Bronze · 17th and 19th editions
                                    </p>
                                    <p className="text-sm leading-6 text-zinc-300">Honorable mention · 18th edition</p>
                                    <div className="mt-2 flex flex-wrap gap-x-3">
                                        <a
                                            className={externalProofLink}
                                            href="https://premiacao.obmep.org.br/17obmep/verRelatorioPremiadosBronze.do.htm"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Official results for the 17th OBMEP (opens in a new tab)"
                                        >
                                            17th
                                            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                                        </a>
                                        <a
                                            className={externalProofLink}
                                            href="https://premiacao.obmep.org.br/18obmep/verRelatorioPremiadosGeral-SP.2.do.htm"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Official results for the 18th OBMEP (opens in a new tab)"
                                        >
                                            18th
                                            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                                        </a>
                                        <a
                                            className={externalProofLink}
                                            href="https://premiacao.obmep.org.br/19obmep/verRelatorioPremiadosBronze.do.htm"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Official results for the 19th OBMEP (opens in a new tab)"
                                        >
                                            19th
                                            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-[3rem_minmax(0,1fr)] gap-4 sm:grid-cols-[3.5rem_minmax(0,1fr)]">
                                <OmaspLogo className="h-12 w-12 shrink-0 text-violet-300 sm:h-14 sm:w-14" />
                                <div className="min-w-0">
                                    <h5 className="text-base font-bold text-white">OMASP</h5>
                                    <p className="mt-1 text-sm leading-6 text-zinc-200">State silver medal · 2024</p>
                                    <a
                                        className={`${externalProofLink} mt-2`}
                                        href="https://olimpiadassp.educacao.sp.gov.br/wp-content/uploads/2024/08/Medalhistas-Estaduais-OMASP-novo-1.pdf"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Official results for OMASP 2024 (opens in a new tab)"
                                    >
                                        Official results
                                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                <div
                    data-about-reveal
                    className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
                >
                    <p className="max-w-2xl text-base leading-7 text-zinc-300">
                        Have a system or interactive experience to build? I can help turn the idea into working
                        software.
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-lg px-1 font-semibold text-violet-200 underline decoration-violet-400/50 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 sm:self-auto"
                    >
                        Let&apos;s talk
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    )
}
