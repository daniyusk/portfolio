import gsap from "gsap"
import { useEffect, useRef } from "react"

export interface ScrollRevealOptions {
    /** CSS selector for items to animate inside the container. Defaults to `"[data-reveal]"` */
    selector?: string
    /** Vertical offset in pixels from which elements animate. Defaults to `32` */
    y?: number
    /** Starting scale of elements. Defaults to `0.97` */
    scale?: number
    /** Animation duration in seconds. Defaults to `0.85` */
    duration?: number
    /** Stagger delay between successive items in seconds. Defaults to `0.12` */
    stagger?: number
    /** GSAP easing string. Defaults to `"power3.out"` */
    ease?: string
    /** IntersectionObserver threshold ratio. Defaults to `0.2` */
    threshold?: number
}

/**
 * Reusable React hook for smooth, accessible GSAP scroll reveal animations.
 *
 * Automatically handles:
 * - Scoped DOM element queries
 * - prefers-reduced-motion checking
 * - One-time trigger (disconnects on first intersection)
 * - Safe GSAP tween cleanup on unmount
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(options: ScrollRevealOptions = {}) {
    const containerRef = useRef<T>(null)

    const {
        selector = "[data-reveal]",
        y = 32,
        scale = 0.97,
        duration = 0.85,
        stagger = 0.12,
        ease = "power3.out",
        threshold = 0.2,
    } = options

    useEffect(() => {
        const container = containerRef.current
        if (
            !container ||
            typeof window === "undefined" ||
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return
        }

        const elements = container.querySelectorAll(selector)
        if (!elements.length) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    observer.disconnect()
                    gsap.fromTo(
                        elements,
                        { opacity: 0, y, scale },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration,
                            stagger,
                            ease,
                            clearProps: "transform",
                        },
                    )
                }
            },
            { threshold },
        )

        observer.observe(container)

        return () => {
            observer.disconnect()
            gsap.killTweensOf(elements)
        }
    }, [selector, y, scale, duration, stagger, ease, threshold])

    return containerRef
}
