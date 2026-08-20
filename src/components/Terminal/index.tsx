import gsap from "gsap"
import { Check, ChevronRight, Copy, TerminalSquare } from "lucide-react"
import { useEffect, useRef } from "react"
import { TerminalTyping } from "./TerminalTyping"

type TerminalProps = {
    command: string
    children: string
    animate?: boolean
    id?: string
    onFinish?: () => void
    title?: string
    typingSpeed?: number
    className?: string
}

export function Terminal({
    command,
    children,
    animate = true,
    id,
    onFinish,
    title = "localhost:3000",
    typingSpeed = 16,
    className = "",
}: TerminalProps) {
    const terminalRef = useRef<HTMLElement>(null)
    const commandText = command.trim()
    const outputText = normalizeTerminalText(children)

    useEffect(() => {
        const terminal = terminalRef.current
        if (!terminal || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const context = gsap.context(() => {
            gsap.fromTo(
                terminal,
                { opacity: 0, y: -12, scale: 0.985 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
            )
            gsap.fromTo(
                ".terminal-status",
                { opacity: 0, x: -8 },
                { opacity: 1, x: 0, duration: 0.42, delay: 0.12, ease: "power2.out" },
            )
        }, terminal)

        return () => context.revert()
    }, [])

    return (
        <section
            ref={terminalRef}
            aria-label={`Terminal running ${commandText}`}
            className={`overflow-hidden rounded-2xl border border-white/12 bg-surface-terminal/96 font-jetbrains shadow-[0_30px_90px_rgba(0,0,0,0.5)] ring-1 ring-violet-400/10 backdrop-blur-xl ${className}`}
            id={id}
        >
            <div className="flex min-h-11 items-center justify-between gap-3 border-b border-white/8 bg-white/[0.035] px-4">
                <div aria-hidden="true" className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-terminal-red" />
                    <span className="h-2.5 w-2.5 rounded-full bg-terminal-yellow" />
                    <span className="h-2.5 w-2.5 rounded-full bg-terminal-green" />
                </div>

                <span className="flex min-w-0 items-center gap-2 truncate text-[0.67rem] font-medium tracking-[0.08em] text-zinc-500">
                    <TerminalSquare aria-hidden="true" className="h-3.5 w-3.5" />
                    {title}
                </span>

                <button
                    aria-label="Copy command"
                    className="grid h-7 w-7 place-items-center rounded-md text-zinc-600 transition hover:bg-white/5 hover:text-zinc-300 focus-visible:outline-2 focus-visible:outline-violet-300"
                    onClick={() => navigator.clipboard?.writeText(commandText)}
                    type="button"
                >
                    <Copy aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
            </div>

            <div className="terminal-status flex items-center justify-between gap-4 border-b border-white/8 bg-violet-500/[0.07] px-4 py-2.5 sm:px-5">
                <span className="text-[0.66rem] font-medium text-zinc-500">localhost:3000</span>
                <span className="inline-flex items-center gap-1.5 text-[0.66rem] font-semibold text-emerald-300">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                    Profile loaded
                </span>
            </div>

            <div className="max-h-[min(46vh,28rem)] overflow-auto p-4 text-[0.72rem] leading-5 sm:p-5 sm:text-[0.8rem] sm:leading-6">
                <div className="mb-4 grid grid-cols-[auto_minmax(0,1fr)] gap-2.5 text-zinc-200">
                    <ChevronRight aria-hidden="true" className="mt-1 h-4 w-4 text-violet-400" />
                    <span className="min-w-0 break-words font-medium">{commandText}</span>
                </div>

                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2.5">
                    <span aria-hidden="true" className="select-none text-violet-500">
                        ~
                    </span>
                    <span className="min-w-0 whitespace-pre-wrap break-words text-zinc-400">
                        <TerminalTyping
                            animate={animate}
                            key={`${commandText}:${outputText}:${animate}`}
                            onFinish={onFinish}
                            speed={typingSpeed}
                            text={outputText}
                        />
                    </span>
                </div>
            </div>
        </section>
    )
}

function normalizeTerminalText(text: string) {
    const lines = text.replace(/\r\n/g, "\n").split("\n")

    while (lines[0]?.trim() === "") lines.shift()
    while (lines[lines.length - 1]?.trim() === "") lines.pop()

    const indents = lines.filter((line) => line.trim().length > 0).map((line) => line.match(/^\s*/)?.[0].length ?? 0)
    const smallestIndent = indents.length > 0 ? Math.min(...indents) : 0

    return lines.map((line) => line.slice(smallestIndent)).join("\n")
}
