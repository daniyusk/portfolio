import gsap from "gsap"
import { Discord } from "pixelarticons/react/Discord"
import { Github } from "pixelarticons/react/Github"
import { Linkedin } from "pixelarticons/react/Linkedin"
import { useEffect, useMemo, useRef } from "react"

interface SocialContact {
    name: string
    handle: string
    url: string
    icon: typeof Github
    colorClass: string
}

const CONTACTS: SocialContact[] = [
    {
        name: "LinkedIn",
        handle: "in/daniel-senzaki",
        url: "https://www.linkedin.com/in/daniel-senzaki-132905407/",
        icon: Linkedin,
        colorClass: "hover:border-[#0a66c2] hover:text-[#0a66c2] hover:shadow-[0_0_24px_rgba(10,102,194,0.45)]",
    },
    {
        name: "GitHub",
        handle: "@daniyusk",
        url: "https://github.com/daniyusk",
        icon: Github,
        colorClass: "hover:border-violet-400 hover:text-violet-300 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)]",
    },
    {
        name: "Discord",
        handle: "@daniyusk",
        url: "https://discord.com/users/670030102490382346",
        icon: Discord,
        colorClass: "hover:border-[#5865f2] hover:text-[#5865f2] hover:shadow-[0_0_24px_rgba(88,101,242,0.45)]",
    },
]

function SubtleStars() {
    const stars = useMemo(() => {
        return Array.from({ length: 60 }, (_, i) => {
            const x = Math.abs(Math.sin(i * 127.1 + 13.7) * 100)
            const y = Math.abs(Math.cos(i * 311.7 + 71.9) * 100)
            const size = i % 9 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1
            const baseOpacity = 0.2 + (i % 5) * 0.15
            const duration = 2.5 + (i % 4) * 1.2
            const delay = (i % 6) * 0.6

            return {
                id: i,
                x: `${x.toFixed(2)}%`,
                y: `${y.toFixed(2)}%`,
                size,
                baseOpacity,
                duration,
                delay,
                isViolet: i % 5 === 0,
            }
        })
    }, [])

    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {stars.map((star) => (
                <span
                    key={star.id}
                    className={`absolute rounded-full animate-pulse ${star.isViolet ? "bg-violet-300" : "bg-white"}`}
                    style={{
                        left: star.x,
                        top: star.y,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.baseOpacity,
                        animationDuration: `${star.duration}s`,
                        animationDelay: `${star.delay}s`,
                    }}
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
                        { opacity: 0, y: 42, scale: 0.95 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.9,
                            stagger: 0.15,
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
            className="relative z-20 flex min-h-screen h-screen w-full items-center justify-center overflow-hidden bg-background px-5 sm:px-8 font-jetbrains"
        >
            {/* Top gradient fade to dissolve the fixed Dither from the previous section */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-background/80 to-background"
            />

            {/* Starry background strictly confined to this fullscreen container */}
            <SubtleStars />

            {/* Soft cosmic glow in center */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(124,58,237,0.08)_0%,transparent_70%)]"
            />

            {/* Vertically and horizontally centered content */}
            <div
                ref={contentRef}
                className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center"
            >
                <h2
                    id="contact-heading"
                    data-contact-element
                    className="text-xl font-bold tracking-wider text-white uppercase sm:text-3xl lg:text-4xl"
                >
                    Let&apos;s build something togheter
                </h2>

                {/* Pixel Art Icons Row */}
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
                                className={`group relative inline-flex h-16 w-16 items-center justify-center border-2 border-white/15 bg-surface-terminal text-zinc-300 transition duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-violet-400 ${item.colorClass}`}
                            >
                                <Icon className="h-8 w-8 transition-transform duration-200 group-hover:scale-110" />

                                {/* Minimalist Modern Tooltip */}
                                <div
                                    role="tooltip"
                                    className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 opacity-0 scale-95 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 z-30 whitespace-nowrap"
                                >
                                    <div className="rounded-xl bg-zinc-900/95 px-3.5 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-md text-center">
                                        <p className="text-xs font-semibold text-white tracking-normal">{item.name}</p>
                                        <p className="text-[0.72rem] font-medium text-zinc-400 leading-tight">
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
