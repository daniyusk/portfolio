import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function ProfileTilt() {
    const figureRef = useRef<HTMLElement>(null)
    const cardRef = useRef<HTMLAnchorElement>(null)
    const glareRef = useRef<HTMLSpanElement>(null)
    const [imageError, setImageError] = useState(false)

    useEffect(() => {
        const figure = figureRef.current
        const card = cardRef.current
        const glare = glareRef.current
        if (!figure || !card || !glare) return

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reduceMotion) return

        const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.65, ease: "power3.out" })
        const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.65, ease: "power3.out" })
        const glareX = gsap.quickTo(glare, "xPercent", { duration: 0.45, ease: "power2.out" })
        const glareY = gsap.quickTo(glare, "yPercent", { duration: 0.45, ease: "power2.out" })

        const handlePointerMove = (event: PointerEvent) => {
            const rect = figure.getBoundingClientRect()
            const x = (event.clientX - rect.left) / rect.width - 0.5
            const y = (event.clientY - rect.top) / rect.height - 0.5
            rotateX(y * -18)
            rotateY(x * 18)
            glareX(x * 55)
            glareY(y * 55)
        }

        const handlePointerEnter = () => {
            gsap.to(card, { scale: 1.045, duration: 0.45, ease: "power3.out" })
            gsap.to(glare, { opacity: 0.72, duration: 0.3 })
        }

        const handlePointerLeave = () => {
            rotateX(0)
            rotateY(0)
            gsap.to(card, { scale: 1, duration: 0.65, ease: "elastic.out(1, 0.55)" })
            gsap.to(glare, { opacity: 0, duration: 0.45 })
        }

        figure.addEventListener("pointermove", handlePointerMove)
        figure.addEventListener("pointerenter", handlePointerEnter)
        figure.addEventListener("pointerleave", handlePointerLeave)

        return () => {
            figure.removeEventListener("pointermove", handlePointerMove)
            figure.removeEventListener("pointerenter", handlePointerEnter)
            figure.removeEventListener("pointerleave", handlePointerLeave)
        }
    }, [])

    return (
        <figure
            ref={figureRef}
            aria-label="Daniel (@daniyusk) profile card"
            className="profile-figure relative mx-auto grid aspect-square w-full max-w-72 place-items-center [perspective:900px] sm:max-w-80 lg:max-w-96"
        >
            <span aria-hidden="true" className="absolute inset-[4%] rounded-full bg-violet-600/25 blur-3xl" />
            <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-violet-300/15 [background:conic-gradient(from_120deg,transparent_0_18%,rgba(196,181,253,.75)_28%,transparent_38_66%,rgba(124,58,237,.65)_78%,transparent_88%)] p-px animate-[spin_18s_linear_infinite]"
            />

            <a
                ref={cardRef}
                aria-label="Daniel (@daniyusk) on GitHub (opens in a new tab)"
                className="group relative isolate block aspect-square w-[88%] overflow-hidden rounded-full border border-white/15 bg-zinc-950 shadow-[0_0_100px_22px_rgba(124,58,237,0.3),0_35px_70px_rgba(0,0,0,0.45)] outline-none will-change-transform [transform-style:preserve-3d] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-violet-300"
                href="https://github.com/daniyusk"
                rel="noreferrer"
                target="_blank"
            >
                {!imageError ? (
                    <img
                        alt="Daniel's GitHub profile avatar"
                        className="h-full w-full object-cover saturate-[0.92] transition duration-700 group-hover:saturate-110"
                        draggable="false"
                        onError={() => setImageError(true)}
                        src="https://github.com/daniyusk.png?size=768"
                    />
                ) : (
                    <div
                        aria-hidden="true"
                        className="grid h-full w-full place-items-center bg-gradient-to-br from-violet-950 via-zinc-900 to-black text-4xl font-bold tracking-wider text-violet-300 sm:text-5xl"
                    >
                        <span>DY</span>
                    </div>
                )}

                <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0a0712]/70 via-transparent to-white/10"
                />
                <span
                    ref={glareRef}
                    aria-hidden="true"
                    className="absolute -inset-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.52)_0%,rgba(196,181,253,0.2)_18%,transparent_58%)] opacity-0 mix-blend-screen"
                />

                <span className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-2 pb-[9%] text-xs font-semibold tracking-[0.16em] text-white/90 uppercase [transform:translateZ(35px)] sm:text-sm">
                    <svg aria-hidden="true" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 .7A11.3 11.3 0 0 0 8.4 22.8c.6.1.8-.3.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.1c-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.1 1.2a10.8 10.8 0 0 1 5.7 0c2.2-1.5 3.1-1.2 3.1-1.2.6 1.6.2 2.9.1 3.2a4.7 4.7 0 0 1 1.2 3.1c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.3 11.3 0 0 0 12 .7Z" />
                    </svg>
                    @daniyusk
                </span>
            </a>
        </figure>
    )
}
