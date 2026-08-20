import { Color, Mesh, Program, Renderer, Triangle } from "ogl"
import type { CSSProperties, ReactNode } from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/styles/utils"

type ButtonLinkProps = {
    children: ReactNode
    className?: string
    href: string
    variant?: "primary" | "secondary"
}

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uThickness;
out vec4 fragColor;

float roundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = roundedRect(p, uHalfSize, uRadius);
  vec2 light = vec2(cos(uAngle), sin(uAngle));
  vec2 normal = normalize(p / (uHalfSize * uHalfSize) + 0.000001);
  float facing = pow(abs(dot(normal, light)), 10.0);
  float edge = exp(-pow(d / max(uThickness, 0.001), 2.0));
  float base = (1.0 - smoothstep(0.0, 2.0, abs(d))) * 0.36;
  float shine = edge * facing * uIntensity;
  fragColor = vec4(uBaseColor * base + uLineColor * shine, clamp(base + shine, 0.0, 1.0));
}
`

export function ButtonLink({ children, className, href, variant = "primary" }: ButtonLinkProps) {
    const anchorRef = useRef<HTMLAnchorElement>(null)
    const effectRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const anchor = anchorRef.current
        const effect = effectRef.current
        if (!anchor || !effect) return

        try {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const renderer = new Renderer({ alpha: true, antialias: true, dpr })
            const gl = renderer.gl
            if (!gl) return

            gl.clearColor(0, 0, 0, 0)
            gl.enable(gl.BLEND)
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

            const geometry = new Triangle(gl)
            if (geometry.attributes.uv) delete geometry.attributes.uv

            const program = new Program(gl, {
                vertex: VERTEX_SHADER,
                fragment: FRAGMENT_SHADER,
                uniforms: {
                    uCenter: { value: [0, 0] },
                    uHalfSize: { value: [1, 1] },
                    uRadius: { value: 14 * dpr },
                    uAngle: { value: 2.4 },
                    uLineColor: { value: [1, 1, 1] },
                    uBaseColor: { value: [0.35, 0.2, 0.72] },
                    uIntensity: { value: 0 },
                    uThickness: { value: 1.2 * dpr },
                },
            })
            const mesh = new Mesh(gl, { geometry, program })
            effect.appendChild(gl.canvas)

            let width = 1
            let height = 1
            let targetAngle = 2.4
            let angle = 2.4
            let targetIntensity = 0
            let intensity = 0
            let animationFrame = 0
            let lastTime = performance.now()

            const lineColor = new Color(variant === "primary" ? "#ffffff" : "#c4b5fd")
            const baseColor = new Color(variant === "primary" ? "#7c3aed" : "#5b21b6")
            program.uniforms.uLineColor.value = [lineColor.r, lineColor.g, lineColor.b]
            program.uniforms.uBaseColor.value = [baseColor.r, baseColor.g, baseColor.b]

            const resize = () => {
                const rect = anchor.getBoundingClientRect()
                width = rect.width
                height = rect.height
                renderer.setSize(width + 40, height + 40)
                program.uniforms.uCenter.value = [(20 + width / 2) * dpr, (20 + height / 2) * dpr]
                program.uniforms.uHalfSize.value = [(width / 2) * dpr, (height / 2) * dpr]
                program.uniforms.uRadius.value = Math.min(14, height / 2) * dpr
            }

            const handlePointerMove = (event: PointerEvent) => {
                const rect = anchor.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2
                const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right)
                const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom)
                const distance = Math.hypot(dx, dy)
                const proximity = Math.max(0, 1 - distance / 240)
                targetIntensity = proximity * proximity * 1.35
                targetAngle = Math.atan2(centerY - event.clientY, event.clientX - centerX)
            }

            const render = (now: number) => {
                const delta = Math.min((now - lastTime) / 1000, 0.05)
                lastTime = now
                const difference = ((targetAngle - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
                angle += difference * (1 - Math.exp(-delta * 9))
                intensity += (targetIntensity - intensity) * (1 - Math.exp(-delta * 10))
                program.uniforms.uAngle.value = angle
                program.uniforms.uIntensity.value = intensity
                renderer.render({ scene: mesh })
                animationFrame = requestAnimationFrame(render)
            }

            const observer = new ResizeObserver(resize)
            observer.observe(anchor)
            window.addEventListener("pointermove", handlePointerMove)
            resize()
            animationFrame = requestAnimationFrame(render)

            return () => {
                observer.disconnect()
                window.removeEventListener("pointermove", handlePointerMove)
                cancelAnimationFrame(animationFrame)
                gl.canvas.remove()
                gl.getExtension("WEBGL_lose_context")?.loseContext()
            }
        } catch {
            // Graceful fallback for devices/environments without WebGL support
            return
        }
    }, [variant])

    return (
        <a
            ref={anchorRef}
            className={cn(
                "group relative isolate inline-flex min-h-12 items-center justify-center gap-3 overflow-visible rounded-[14px] px-5 py-3 font-semibold leading-none tracking-tight text-white outline-none transition duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300",
                variant === "primary"
                    ? "bg-violet-600/90 shadow-[0_18px_45px_rgba(91,33,182,0.34),inset_0_1px_0_rgba(255,255,255,0.18)] hover:bg-violet-500/90"
                    : "bg-zinc-950/45 text-violet-100 shadow-[0_18px_45px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md hover:bg-violet-950/45",
                className,
            )}
            href={href}
            style={{ "--button-glow": variant === "primary" ? "#a78bfa" : "#7c3aed" } as CSSProperties}
        >
            <span
                ref={effectRef}
                aria-hidden="true"
                className="pointer-events-none absolute -inset-5 z-10 [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
            />
            <span
                aria-hidden="true"
                className="absolute inset-px -z-10 rounded-[13px] bg-gradient-to-b from-white/10 to-transparent opacity-80"
            />
            <span className="relative z-20 contents">{children}</span>
        </a>
    )
}
