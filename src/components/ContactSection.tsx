import { Discord } from "pixelarticons/react/Discord"
import { ExternalLink } from "pixelarticons/react/ExternalLink"
import { Github } from "pixelarticons/react/Github"
import { Linkedin } from "pixelarticons/react/Linkedin"
import { Message } from "pixelarticons/react/Message"

const CONTACT_LINKS = [
    {
        name: "LinkedIn",
        label: "/in/daniel-senzaki",
        url: "https://www.linkedin.com/in/daniel-senzaki-132905407/",
        icon: Linkedin,
        accentColor: "hover:border-[#0a66c2]/80 hover:shadow-[4px_4px_0px_0px_#0a66c2]",
        tag: "Connect",
    },
    {
        name: "GitHub",
        label: "@daniyusk",
        url: "https://github.com/daniyusk",
        icon: Github,
        accentColor: "hover:border-violet-400 hover:shadow-[4px_4px_0px_0px_#7c3aed]",
        tag: "Follow",
    },
    {
        name: "Discord",
        label: "@daniyusk",
        url: "https://discord.com/users/670030102490382346",
        icon: Discord,
        accentColor: "hover:border-[#5865f2]/80 hover:shadow-[4px_4px_0px_0px_#5865f2]",
        tag: "Chat",
    },
]

export function ContactSection() {
    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="relative z-10 w-full border-t border-white/8 bg-background py-20 px-5 sm:px-8 lg:px-12 font-jetbrains"
        >
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="mb-4 inline-flex items-center gap-2 border border-violet-500/30 bg-violet-950/40 px-3 py-1 text-xs text-violet-300 shadow-[2px_2px_0px_0px_#7c3aed]">
                        <Message className="h-3.5 w-3.5 animate-pulse" />
                        <span className="tracking-wider uppercase">{"Contact // 01"}</span>
                    </div>

                    <h2
                        id="contact-heading"
                        className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
                    >
                        Let&apos;s build something togheter
                    </h2>

                    <p className="mt-3 max-w-lg text-xs leading-relaxed text-zinc-400 sm:text-sm">
                        Feel free to reach out for collaborations, new projects, or just to say hello.
                    </p>
                </div>

                {/* Pixel Art Cards Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {CONTACT_LINKS.map((item) => {
                        const IconComponent = item.icon
                        return (
                            <a
                                key={item.name}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className={`group relative flex flex-col justify-between border-2 border-white/10 bg-surface-terminal/90 p-5 transition duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#7c3aed] ${item.accentColor} focus-visible:outline-2 focus-visible:outline-violet-400`}
                            >
                                {/* Top corner pixel accent */}
                                <div className="absolute top-1 right-1 h-1 w-1 bg-white/20 group-hover:bg-violet-400" />
                                <div className="absolute bottom-1 left-1 h-1 w-1 bg-white/20 group-hover:bg-violet-400" />

                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="grid h-10 w-10 place-items-center border border-white/10 bg-white/[0.04] text-white transition duration-150 group-hover:scale-105 group-hover:text-violet-300">
                                            <IconComponent className="h-5 w-5" />
                                        </div>
                                        <span className="border border-white/10 px-2 py-0.5 text-[0.65rem] text-zinc-500 uppercase transition duration-150 group-hover:border-violet-500/40 group-hover:text-violet-300">
                                            {item.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-sm font-semibold text-white group-hover:text-violet-200">
                                        {item.name}
                                    </h3>
                                    <p className="mt-1 text-xs text-zinc-400 truncate">{item.label}</p>
                                </div>

                                <div className="mt-6 flex items-center gap-1.5 text-xs text-zinc-500 transition duration-150 group-hover:text-zinc-300">
                                    <span>Open link</span>
                                    <ExternalLink className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                            </a>
                        )
                    })}
                </div>

                {/* Retro Status Footer */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/6 pt-6 text-[0.7rem] text-zinc-500">
                    <div className="flex items-center gap-2">
                        <span className="inline-block h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                        <span className="text-emerald-400 font-medium">AVAILABLE FOR WORK</span>
                    </div>
                    <span>DANIYUSK © 2026</span>
                </div>
            </div>
        </section>
    )
}
