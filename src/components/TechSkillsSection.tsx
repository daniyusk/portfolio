import { Code2, Cpu, Database, Layers } from "lucide-react"
import { skillCategories } from "@/data/skills"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import type { SkillCategory, SkillCategoryId } from "@/types/skills"

const categoryIcons: Record<SkillCategoryId, typeof Code2> = {
    languages: Code2,
    frameworks: Layers,
    databases: Database,
    tools: Cpu,
}

interface SkillCategoryCardProps {
    category: SkillCategory
}

function SkillCategoryCard({ category }: SkillCategoryCardProps) {
    const Icon = categoryIcons[category.id]

    return (
        <article
            data-skills-reveal
            className="flex h-full flex-col rounded-[20px] border border-white/10 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-white/15"
        >
            <header className="flex items-center gap-3.5">
                <div
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-violet-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                    <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">{category.title}</h3>
            </header>

            <div className="my-5 h-px w-full bg-white/10" aria-hidden="true" />

            <ul aria-label={category.title} className="flex flex-wrap gap-2.5 sm:gap-3">
                {category.skills.map((skill) => (
                    <li key={skill.id}>
                        <div className="group relative flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-white/[0.07] hover:shadow-[0_8px_20px_rgba(124,58,237,0.14)]">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.18)_0%,transparent_70%)]"
                            />
                            <div className="relative z-10 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center">
                                <i
                                    aria-hidden="true"
                                    className={`${skill.devicon} text-lg sm:text-xl transition-transform duration-200 group-hover:scale-110`}
                                />
                            </div>
                            <span className="relative z-10 font-jetbrains text-xs font-medium text-zinc-200 transition-colors group-hover:text-white sm:text-sm">
                                {skill.name}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </article>
    )
}

export function TechSkillsSection() {
    const containerRef = useScrollReveal<HTMLDivElement>({
        selector: "[data-skills-reveal]",
        y: 28,
        scale: 0.98,
        duration: 0.8,
        stagger: 0.1,
        threshold: 0.1,
    })

    const languagesCat = skillCategories.find((c) => c.id === "languages")!
    const frameworksCat = skillCategories.find((c) => c.id === "frameworks")!
    const databasesCat = skillCategories.find((c) => c.id === "databases")!
    const toolsCat = skillCategories.find((c) => c.id === "tools")!

    return (
        <section
            id="skills"
            aria-labelledby="skills-heading"
            className="relative z-20 w-full bg-background px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_46%_at_50%_48%,rgba(124,58,237,0.065)_0%,transparent_72%)]"
            />

            <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl">
                <header data-skills-reveal className="mb-12 border-b border-white/10 pb-8">
                    <div className="max-w-2xl">
                        <h2
                            id="skills-heading"
                            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
                        >
                            Technologies & Skills
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                            Languages, frameworks, databases, and environments across systems engineering, game
                            development, and full-stack software.
                        </p>
                    </div>
                </header>

                <div className="space-y-6 lg:space-y-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        <SkillCategoryCard category={languagesCat} />
                        <SkillCategoryCard category={frameworksCat} />
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-4">
                            <SkillCategoryCard category={databasesCat} />
                        </div>
                        <div className="lg:col-span-8">
                            <SkillCategoryCard category={toolsCat} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
