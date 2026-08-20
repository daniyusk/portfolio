import { Discord } from "pixelarticons/react/Discord"
import { Github } from "pixelarticons/react/Github"
import { Linkedin } from "pixelarticons/react/Linkedin"

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

export function ContactSection() {
    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="relative z-10 w-full border-t border-white/8 bg-background py-20 px-5 sm:px-8 font-jetbrains"
        >
            <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
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

                                {/* Retro Tooltip */}
                                <div
                                    role="tooltip"
                                    className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 opacity-0 transition-all duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 z-30 whitespace-nowrap"
                                >
                                    <div className="border-2 border-white/20 bg-surface-terminal px-3 py-1.5 shadow-[3px_3px_0px_0px_#7c3aed] text-left">
                                        <p className="text-xs font-bold text-white tracking-wide">{item.name}</p>
                                        <p className="text-[0.68rem] text-zinc-400 font-mono">-&#35; {item.handle}</p>
                                    </div>
                                    <div className="mx-auto h-1.5 w-1.5 -translate-y-[3px] rotate-45 border-r-2 border-b-2 border-white/20 bg-surface-terminal" />
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
