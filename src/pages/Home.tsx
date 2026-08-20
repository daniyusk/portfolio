import gsap from "gsap"
import { Mail, Rocket } from "lucide-react"
import { useEffect, useRef } from "react"
import LogoSVG from "@/assets/logo.svg?react"
import { ButtonLink } from "@/components/Buttons"
import { ContactSection } from "@/components/ContactSection"
import { Dither } from "@/components/Dither"
import { ProfileTilt } from "@/components/ProfileTilt"
import { typography } from "@/components/Typography"

export function Home() {
    const pageRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const page = pageRef.current
        if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const context = gsap.context(() => {
            const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })
            timeline
                .fromTo("[data-hero-reveal]", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 })
                .fromTo(
                    ".profile-figure",
                    { opacity: 0, x: 32, scale: 0.92 },
                    { opacity: 1, x: 0, scale: 1, duration: 0.9 },
                    "-=0.55",
                )
        }, page)

        return () => context.revert()
    }, [])

    return (
        <main ref={pageRef} className="relative isolate min-h-screen overflow-x-hidden">
            <Dither />
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
                    relative
                    z-10
                    sm:px-8
                    lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]
                    lg:gap-14
                    lg:px-12
                    lg:py-16
                "
            >
                <div className="flex min-w-0 w-full max-w-full flex-col gap-[2cqw] @container sm:max-w-152.5">
                    <div className="w-full @container" data-hero-reveal>
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

                    <div aria-hidden="true" className="w-full py-1" data-hero-reveal>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                    </div>

                    <div className="flex w-full min-w-0 gap-[2cqw]" data-hero-reveal>
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

                <ProfileTilt />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent z-10"
                />
            </section>

            <ContactSection />
        </main>
    )
}
