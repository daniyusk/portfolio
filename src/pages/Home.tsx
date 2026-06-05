import { useState } from "react"
import { Mail, MoreHorizontal, Rocket } from "lucide-react"
import { ButtonLink } from "@/components/Buttons"
import { typography } from "@/components/Typography"
import { Terminal } from "@/components/Terminal"

import LogoSVG from "@/assets/logo.svg?react"

export function Home() {
    const [descriptionOpened, setDescriptionOpened] = useState(false)
    const [hasPlayedTerminal, setHasPlayedTerminal] = useState(false)

    const handleToggleDescription = () => {
        setDescriptionOpened((current) => !current)
    }

    return (
        <main className="min-h-screen overflow-x-hidden">
            <section
                aria-labelledby="hero-title"
                className="
                    mx-auto
                    grid
                    min-h-screen
                    w-full
                    max-w-7xl
                    grid-cols-1
                    items-center
                    gap-10
                    px-5
                    py-12
                    sm:px-8
                    lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]
                    lg:gap-14
                    lg:px-12
                    lg:py-16
                "
            >
                <div className="flex min-w-0 w-full max-w-full flex-col gap-[2cqw] @container sm:max-w-152.5">
                    <div className="w-full @container">
                        <h1 id="hero-title" className="sr-only">
                            Daniyusk, Full-stack Developer
                        </h1>

                        <LogoSVG
                            aria-hidden="true"
                            className="
                                block
                                h-auto
                                w-full
                                max-w-full
                            "
                        />

                        <p
                            className={`
                                ${typography.bodySmall}
                                mt-[4cqw]
                                w-full
                                text-center
                                text-[clamp(0.9rem,4.2cqw,1.7rem)]
                                leading-none
                                whitespace-nowrap
                            `}
                        >
                            In constant debug - of life and code
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            aria-controls="hero-terminal"
                            aria-expanded={descriptionOpened}
                            aria-label="Toggle terminal description"
                            className="
                                group
                                flex
                                w-full
                                items-center
                                gap-3
                                text-zinc-500
                                transition-colors
                                hover:text-zinc-300
                                focus-visible:outline-2
                                focus-visible:outline-offset-4
                                focus-visible:outline-violet-400
                            "
                            onClick={handleToggleDescription}
                            type="button"
                        >
                            <span
                                className="
                                    h-px
                                    flex-1
                                    bg-white/8
                                    transition-colors
                                    group-hover:bg-violet-500/40
                                "
                            />

                            <span
                                className={`
                                    grid
                                    h-7
                                    w-10
                                    place-items-center
                                    rounded-full
                                    border
                                    border-white/8
                                    bg-white/6
                                    shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                                    transition-colors
                                    ${descriptionOpened ? "border-violet-500/60 text-violet-300" : ""}
                                `}
                            >
                                <MoreHorizontal aria-hidden="true" className="h-5 w-5" />
                            </span>
                        </button>

                        {descriptionOpened && (
                            <Terminal
                                animate={!hasPlayedTerminal}
                                className="
                                    w-full
                                    max-w-full
                                    sm:max-w-2xl
                                "
                                command="profile daniyusk --summary"
                                id="hero-terminal"
                                onFinish={() => setHasPlayedTerminal(true)}
                                title="about.daniyusk"
                                typingSpeed={14}
                            >
                                {`
                                    Name: Daniel
                                    Role: Full-stack Developer
                                    Focus: Interfaces, systems and polished web experiences
                                    Status: Always learning and building
                                `}
                            </Terminal>
                        )}
                    </div>

                    <div className="flex w-full min-w-0 gap-[2cqw]">
                        <ButtonLink
                            className="
                                basis-0
                                flex-1
                                min-w-0
                                justify-center
                                px-[3cqw]
                                py-[1.4cqw]
                                text-[clamp(0.8rem,2.2cqw,1.25rem)]
                                [&>svg]:h-[1.2em]
                                [&>svg]:w-[1.2em]
                            "
                            href="#projects"
                        >
                            <Rocket aria-hidden="true" />
                            View Projects
                        </ButtonLink>

                        <ButtonLink
                            className="
                                basis-0
                                flex-1
                                min-w-0
                                justify-center
                                px-[3cqw]
                                py-[1.4cqw]
                                text-[clamp(0.8rem,2.2cqw,1.25rem)]
                                [&>svg]:h-[1.2em]
                                [&>svg]:w-[1.2em]
                            "
                            href="#contact"
                            variant="secondary"
                        >
                            <Mail aria-hidden="true" />
                            Contact me
                        </ButtonLink>
                    </div>
                </div>

                <div
                    aria-hidden="true"
                    className="
                        mx-auto
                        grid
                        w-full
                        max-w-72
                        place-items-center
                        sm:max-w-80
                        lg:max-w-96
                    "
                >
                    <div
                        className="
                            aspect-square
                            w-full
                            rounded-full
                            border
                            border-violet-400/35
                            bg-zinc-950/95
                            shadow-[0_0_120px_28px_rgba(124,58,237,0.32)]
                            ring-1
                            ring-white/10
                        "
                    />
                </div>
            </section>
        </main>
    )
}
