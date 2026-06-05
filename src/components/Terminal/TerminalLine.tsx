import type { ReactNode } from "react"

type TerminalLineVariant = "command" | "output"

type TerminalLineProps = {
    marker: string
    children: ReactNode
    variant?: TerminalLineVariant
    className?: string
}

const lineVariantStyles: Record<TerminalLineVariant, string> = {
    command: "text-sky-100",
    output: "text-zinc-300",
}

export function TerminalLine({
    marker,
    children,
    variant = "output",
    className = "",
}: TerminalLineProps) {
    return (
        <div
            className={`
                grid
                grid-cols-[auto_minmax(0,1fr)]
                gap-3
                ${lineVariantStyles[variant]}
                ${className}
            `}
        >
            <span
                aria-hidden="true"
                className="
                    select-none
                    text-sky-400
                "
            >
                {marker}
            </span>

            <span className="min-w-0 whitespace-pre-wrap break-words">
                {children}
            </span>
        </div>
    )
}
