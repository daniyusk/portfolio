import { TerminalLine } from "./TerminalLine"
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
    title = "daniyusk.dev",
    typingSpeed = 16,
    className = "",
}: TerminalProps) {
    const commandText = command.trim()
    const outputText = normalizeTerminalText(children)

    return (
        <section
            aria-label={`Terminal running ${commandText}`}
            id={id}
            role="region"
            className={`
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-zinc-950/95
                font-jetbrains
                shadow-[0_24px_80px_rgba(0,0,0,0.42)]
                ring-1
                ring-sky-400/10
                ${className}
            `}
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    border-b
                    border-white/10
                    bg-white/3
                    px-4
                    py-3
                "
            >
                <div
                    aria-hidden="true"
                    className="flex gap-2"
                >
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>

                <span
                    className="
                        min-w-0
                        truncate
                        text-[0.68rem]
                        font-medium
                        uppercase
                        tracking-[0.16em]
                        text-zinc-500
                    "
                >
                    {title}
                </span>

                <div
                    aria-hidden="true"
                    className="w-13"
                />
            </div>

            <div
                className="
                    max-h-[min(46vh,28rem)]
                    space-y-3
                    overflow-auto
                    p-4
                    text-sm
                    leading-6
                    sm:p-5
                "
                tabIndex={0}
            >
                <TerminalLine
                    marker="$"
                    variant="command"
                    className="font-medium"
                >
                    {commandText}
                </TerminalLine>

                <div
                    className="
                        border-l
                        border-emerald-300/25
                        pl-3
                    "
                >
                    <TerminalLine marker=">" variant="output">
                        <TerminalTyping
                            animate={animate}
                            key={`${commandText}:${outputText}:${animate}`}
                            onFinish={onFinish}
                            speed={typingSpeed}
                            text={outputText}
                        />
                    </TerminalLine>
                </div>
            </div>
        </section>
    )
}

function normalizeTerminalText(text: string) {
    const lines = text.replace(/\r\n/g, "\n").split("\n")

    while (lines[0]?.trim() === "") {
        lines.shift()
    }

    while (lines[lines.length - 1]?.trim() === "") {
        lines.pop()
    }

    const indents = lines
        .filter((line) => line.trim().length > 0)
        .map((line) => line.match(/^\s*/)?.[0].length ?? 0)

    const smallestIndent = indents.length > 0
        ? Math.min(...indents)
        : 0

    return lines
        .map((line) => line.slice(smallestIndent))
        .join("\n")
}
