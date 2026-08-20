import { Discord } from "pixelarticons/react/Discord"
import { Github } from "pixelarticons/react/Github"
import { Linkedin } from "pixelarticons/react/Linkedin"
import { useMemo } from "react"

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
        colorClass: "hover:border-[#0a66c2] hover:text-[#0a66c2] hover:shadow-[3px_3px_0px_0px_#0a66c2]",
    },
    {
        name: "GitHub",
        handle: "@daniyusk",
        url: "https://github.com/daniyusk",
        icon: Github,
        colorClass: "hover:border-violet-400 hover:text-violet-300 hover:shadow-[3px_3px_0px_0px_#7c3aed]",
    },
    {
        name: "Discord",
        handle: "@daniyusk",
        url: "https://discord.com/users/670030102490382346",
        icon: Discord,
        colorClass: "hover:border-[#5865f2] hover:text-[#5865f2] hover:shadow-[3px_3px_0px_0px_#5865f2]",
    },
]

function SubtleStars() {
    const stars = useMemo(() => {
        return Array.from({ length: 48 }, (_, i) => {
            // Deterministic distribution to avoid hydration issues
            const x = Math.abs(Math.sin(i * 127.1 + 13.7) * 100)
            const y = Math.abs(Math.cos(i * 311.7 + 71.9) * 100)
            const size = i % 8 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1
            const baseOpacity = 0.18 + (i % 5) * 0.14
            const duration = 2.4 + (i % 4) * 1.1
            const delay = (i % 6) * 0.65

            return {
                id: i,
                x: `${x.toFixed(2)}%`,
                y: `${y.toFixed(2)}%`,
                size,
                baseOpacity,
                duration,
                delay,
                isViolet: i % 6 === 0,
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
    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="relative z-10 w-full overflow-hidden bg-background py-24 px-5 sm:px-8 font-jetbrains"
        >
            {/* Smooth top dissolve gradient over the fixed Dither background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 left-0 right-0 h-32 sm:-top-48 sm:h-48 bg-gradient-to-b from-transparent via-background/70 to-background"
            />

            {/* Subtle background starfield strictly contained in Contact section */}
            <SubtleStars />

            {/* Subtle radial ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(124,58,237,0.07)_0%,transparent_75%)]"
            />

            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
                <h2
                    id="contact-heading"
                    className="text-lg font-bold tracking-wider text-white uppercase sm:text-2xl lg:text-3xl"
                >
                    Let&apos;s build something togheter
                </h2>

                {/* Pixel Art Icons Row */}
                <div className="mt-8 flex items-center justify-center gap-6 sm:gap-8">
                    {CONTACTS.map((item) => {
                        const Icon = item.icon
                        return (
                            <a
                                key={item.name}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${item.name} (${item.handle})`}
                                className={`group relative inline-flex h-14 w-14 items-center justify-center border-2 border-white/15 bg-surface-terminal text-zinc-300 transition duration-150 active:translate-x-0.5 active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-violet-400 ${item.colorClass}`}
                            >
                                <Icon className="h-7 w-7 transition-transform duration-150 group-hover:scale-110" />

                                {/* Minimalist Modern Tooltip */}
                                <div
                                    role="tooltip"
                                    className="pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 opacity-0 scale-95 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 z-30 whitespace-nowrap"
                                >
                                    <div className="rounded-xl bg-zinc-900/95 px-3.5 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-md text-center">
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
