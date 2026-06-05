import { useEffect, useRef, useState } from "react"

type TerminalTypingProps = {
    text: string
    animate?: boolean
    speed?: number
    onFinish?: () => void
}

export function TerminalTyping({
    text,
    animate = true,
    speed = 16,
    onFinish,
}: TerminalTypingProps) {
    const [animatedText, setAnimatedText] = useState("")
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === "undefined" || !window.matchMedia) return false

        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    })
    const onFinishRef = useRef(onFinish)
    const finishedRef = useRef(false)
    const shouldAnimate = animate && !prefersReducedMotion && text.length > 0
    const displayed = shouldAnimate ? animatedText : text

    useEffect(() => {
        onFinishRef.current = onFinish
    }, [onFinish])

    useEffect(() => {
        if (!window.matchMedia) return

        const media = window.matchMedia("(prefers-reduced-motion: reduce)")
        const handleChange = () => setPrefersReducedMotion(media.matches)

        handleChange()
        media.addEventListener("change", handleChange)

        return () => media.removeEventListener("change", handleChange)
    }, [])

    useEffect(() => {
        finishedRef.current = false

        const finish = () => {
            if (finishedRef.current) return

            finishedRef.current = true
            onFinishRef.current?.()
        }

        if (!shouldAnimate) {
            finish()
            return
        }

        let index = 0

        const interval = window.setInterval(() => {
            index += 1
            setAnimatedText(text.slice(0, index))

            if (index >= text.length) {
                window.clearInterval(interval)
                finish()
            }
        }, speed)

        return () => window.clearInterval(interval)
    }, [shouldAnimate, speed, text])

    return (
        <>
            <span aria-live="polite">
                {displayed}
            </span>

            <span
                aria-hidden="true"
                className="
                    ml-1
                    inline-block
                    h-4
                    w-2
                    translate-y-0.5
                    animate-pulse
                    rounded-[1px]
                    bg-emerald-300
                    shadow-[0_0_18px_rgba(110,231,183,0.45)]
                "
            />
        </>
    )
}
