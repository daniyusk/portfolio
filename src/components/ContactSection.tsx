import gsap from "gsap"
import { Discord } from "pixelarticons/react/Discord"
import { Github } from "pixelarticons/react/Github"
import { Linkedin } from "pixelarticons/react/Linkedin"
import { Mail } from "pixelarticons/react/Mail"
import type { CSSProperties } from "react"
import { useEffect, useMemo, useRef } from "react"

interface SocialContact {
    name: string
    handle: string
    url: string
    icon: typeof Github
    hoverClass: string
}

const CONTACTS: SocialContact[] = [
    {
        name: "LinkedIn",
        handle: "in/daniel-senzaki",
        url: "https://www.linkedin.com/in/daniel-senzaki-132905407/",
        icon: Linkedin,
        hoverClass:
            "hover:bg-[#0a66c2]/15 hover:text-[#388bfd] hover:shadow-[0_0_24px_rgba(10,102,194,0.35)] focus-visible:bg-[#0a66c2]/15 focus-visible:text-[#388bfd]",
    },
    {
        name: "GitHub",
        handle: "@daniyusk",
        url: "https://github.com/daniyusk",
        icon: Github,
        hoverClass:
            "hover:bg-violet-500/15 hover:text-violet-300 hover:shadow-[0_0_24px_rgba(124,58,237,0.4)] focus-visible:bg-violet-500/15 focus-visible:text-violet-300",
    },
    {
        name: "Discord",
        handle: "@daniyusk",
        url: "https://discord.com/users/670030102490382346",
        icon: Discord,
        hoverClass:
            "hover:bg-[#5865f2]/15 hover:text-[#7289da] hover:shadow-[0_0_24px_rgba(88,101,242,0.35)] focus-visible:bg-[#5865f2]/15 focus-visible:text-[#7289da]",
    },
    {
        name: "Email",
        handle: "daniyusk.dev@gmail.com",
        url: "mailto:daniyusk.dev@gmail.com",
        icon: Mail,
        hoverClass:
            "hover:bg-emerald-500/15 hover:text-emerald-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] focus-visible:bg-emerald-500/15 focus-visible:text-emerald-300",
    },
]

function SubtleStars() {
    const stars = useMemo(() => {
        return Array.from({ length: 72 }, (_, i) => {
            const x = Math.abs(Math.sin(i * 127.1 + 13.7) * 100)
            const y = Math.abs(Math.cos(i * 311.7 + 71.9) * 100)
            const size = i % 10 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1
            const minOp = 0.08 + Math.abs(Math.sin(i * 43.3)) * 0.18
            const maxOp = 0.72 + Math.abs(Math.cos(i * 19.7)) * 0.28
            const duration = 1.8 + Math.abs(Math.sin(i * 77.3)) * 3.2
            const delay = Math.abs(Math.cos(i * 53.1)) * 4.2

            return {
                id: i,
                x: `${x.toFixed(2)}%`,
                y: `${y.toFixed(2)}%`,
                size,
                minOp,
                maxOp,
                duration,
                delay,
                isViolet: i % 7 === 0,
            }
        })
    }, [])

    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {stars.map((star) => (
                <span
                    key={star.id}
                    className={`absolute rounded-full ${star.isViolet ? "bg-violet-300" : "bg-white"}`}
                    style={
                        {
                            left: star.x,
                            top: star.y,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            "--min-op": star.minOp,
                            "--max-op": star.maxOp,
                            animation: `star-twinkle ${star.duration.toFixed(2)}s ease-in-out ${star.delay.toFixed(2)}s infinite`,
                        } as CSSProperties
                    }
                />
            ))}
        </div>
    )
}

export function ContactSection() {
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
                        "[data-contact-element]",
                        { opacity: 0, y: 44, scale: 0.94 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.95,
                            stagger: 0.14,
                            ease: "power3.out",
                            clearProps: "transform",
                        },
                    )
                }
            },
            { threshold: 0.25 },
        )

        observer.observe(section)

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="contact"
            aria-labelledby="contact-heading"
            className="relative z-20 flex min-h-screen h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 sm:px-6"
        >
            {/* Full-width top gradient fade covering 100% of the screen width */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 inset-x-0 h-40 w-full bg-gradient-to-b from-transparent via-background/75 to-background"
            />

            {/* Asymmetrical Starfield confined exclusively to this container */}
            <SubtleStars />

            {/* Soft cosmic glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(124,58,237,0.08)_0%,transparent_70%)]"
            />

            {/* Centered content */}
            <div
                ref={contentRef}
                className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center"
            >
                <h2
                    id="contact-heading"
                    data-contact-element
                    className="text-lg font-bold tracking-wider text-white uppercase sm:text-2xl lg:text-3xl"
                >
                    Let&apos;s build something together
                </h2>

                {/* Circular Icon Buttons Row */}
                <div data-contact-element className="mt-10 flex items-center justify-center gap-6 sm:gap-8">
                    {CONTACTS.map((item) => {
                        const Icon = item.icon
                        return (
                            <a
                                key={item.name}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${item.name} (${item.handle})`}
                                className={`group relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-transparent border border-zinc-700/70 text-zinc-400 transition-all duration-200 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 ${item.hoverClass}`}
                            >
                                <Icon className="h-8 w-8 transition-transform duration-200 group-hover:scale-110" />

                                {/* Minimalist Modern Tooltip - positioned below */}
                                <div
                                    role="tooltip"
                                    className="pointer-events-none absolute top-full left-1/2 mt-3 -translate-x-1/2 opacity-0 scale-95 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 z-30 whitespace-nowrap"
                                >
                                    <div className="rounded-xl bg-zinc-900/95 px-3.5 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.8)] backdrop-blur-md text-center">
                                        <p className="text-xs font-semibold text-white tracking-normal">{item.name}</p>
                                        <p className="text-[0.72rem] font-medium font-jetbrains text-zinc-400 leading-tight">
                                            {item.handle}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
