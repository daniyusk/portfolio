import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform vec2 mousePos;
uniform vec3 waveColor;
varying vec2 vUv;

vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.792842842 - 0.853734721 * r; }
vec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

float cnoise(vec2 p) {
  vec4 pi = floor(p.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 pf = fract(p.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  pi = mod289(pi);
  vec4 ix = pi.xzxz;
  vec4 iy = pi.yyww;
  vec4 fx = pf.xzxz;
  vec4 fy = pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 faded = fade(pf.xy);
  return 2.3 * mix(mix(n00, n10, faded.x), mix(n01, n11, faded.x), faded.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amplitude * abs(cnoise(p));
    p *= 2.65;
    amplitude *= 0.34;
  }
  return value;
}

float bayer8(vec2 position) {
  int x = int(mod(position.x, 8.0));
  int y = int(mod(position.y, 8.0));
  int index = y * 8 + x;
  float matrix[64];
  matrix[0]=0.0; matrix[1]=48.0; matrix[2]=12.0; matrix[3]=60.0; matrix[4]=3.0; matrix[5]=51.0; matrix[6]=15.0; matrix[7]=63.0;
  matrix[8]=32.0; matrix[9]=16.0; matrix[10]=44.0; matrix[11]=28.0; matrix[12]=35.0; matrix[13]=19.0; matrix[14]=47.0; matrix[15]=31.0;
  matrix[16]=8.0; matrix[17]=56.0; matrix[18]=4.0; matrix[19]=52.0; matrix[20]=11.0; matrix[21]=59.0; matrix[22]=7.0; matrix[23]=55.0;
  matrix[24]=40.0; matrix[25]=24.0; matrix[26]=36.0; matrix[27]=20.0; matrix[28]=43.0; matrix[29]=27.0; matrix[30]=39.0; matrix[31]=23.0;
  matrix[32]=2.0; matrix[33]=50.0; matrix[34]=14.0; matrix[35]=62.0; matrix[36]=1.0; matrix[37]=49.0; matrix[38]=13.0; matrix[39]=61.0;
  matrix[40]=34.0; matrix[41]=18.0; matrix[42]=46.0; matrix[43]=30.0; matrix[44]=33.0; matrix[45]=17.0; matrix[46]=45.0; matrix[47]=29.0;
  matrix[48]=10.0; matrix[49]=58.0; matrix[50]=6.0; matrix[51]=54.0; matrix[52]=9.0; matrix[53]=57.0; matrix[54]=5.0; matrix[55]=53.0;
  matrix[56]=42.0; matrix[57]=26.0; matrix[58]=38.0; matrix[59]=22.0; matrix[60]=41.0; matrix[61]=25.0; matrix[62]=37.0; matrix[63]=21.0;
  return matrix[index] / 64.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 point = uv - 0.5;
  point.x *= resolution.x / resolution.y;
  vec2 drift = point + vec2(time * -0.035, time * -0.026);
  float field = fbm(point * 2.2 + fbm(drift * 2.4));

  vec2 mouse = mousePos / resolution;
  mouse.y = 1.0 - mouse.y;
  vec2 mousePoint = mouse - 0.5;
  mousePoint.x *= resolution.x / resolution.y;
  float influence = 1.0 - smoothstep(0.0, 0.52, distance(point, mousePoint));
  field -= influence * 0.22;

  float threshold = bayer8(floor(gl_FragCoord.xy / 2.35)) - 0.25;
  float quantized = floor(clamp(field + threshold * 0.28, 0.0, 1.0) * 3.0 + 0.5) / 3.0;
  vec3 color = mix(vec3(0.018, 0.014, 0.035), waveColor, quantized);
  gl_FragColor = vec4(color, 1.0);
}
`

function DitherPlane({ shouldAnimate }: { shouldAnimate: boolean }) {
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const targetMouse = useRef(new THREE.Vector2())
    const { viewport, size, gl } = useThree()

    useEffect(() => {
        if (!shouldAnimate) return

        const handlePointerMove = (event: PointerEvent) => {
            targetMouse.current.set(event.clientX, event.clientY)
        }
        window.addEventListener("pointermove", handlePointerMove, { passive: true })
        return () => window.removeEventListener("pointermove", handlePointerMove)
    }, [shouldAnimate])

    useEffect(() => {
        const material = materialRef.current
        if (!material) return

        const dpr = gl.getPixelRatio()
        material.uniforms.resolution.value.set(size.width * dpr, size.height * dpr)
        if (targetMouse.current.lengthSq() === 0) {
            targetMouse.current.set(size.width * 0.72, size.height * 0.4)
            material.uniforms.mousePos.value.copy(targetMouse.current)
        }
    }, [gl, size])

    useFrame(({ clock }, delta) => {
        const material = materialRef.current
        if (!material || !shouldAnimate) return

        material.uniforms.time.value = clock.elapsedTime
        material.uniforms.mousePos.value.lerp(targetMouse.current, Math.min(1, delta * 4))
    })

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                ref={materialRef}
                fragmentShader={fragmentShader}
                uniforms={{
                    time: { value: 0 },
                    resolution: { value: new THREE.Vector2(1, 1) },
                    mousePos: { value: new THREE.Vector2(0, 0) },
                    waveColor: { value: new THREE.Color(0.22, 0.06, 0.55) },
                }}
                vertexShader={vertexShader}
            />
        </mesh>
    )
}

export function Dither() {
    const [isPageVisible, setIsPageVisible] = useState(() =>
        typeof document !== "undefined" ? !document.hidden : true,
    )
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
        typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
    )

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

        const handleMotionChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches)
        }
        mediaQuery.addEventListener("change", handleMotionChange)

        const handleVisibilityChange = () => {
            setIsPageVisible(!document.hidden)
        }
        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            mediaQuery.removeEventListener("change", handleMotionChange)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [])

    const shouldAnimate = isPageVisible && !prefersReducedMotion

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-80">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                dpr={[1, 1.5]}
                frameloop={shouldAnimate ? "always" : "demand"}
                gl={{
                    antialias: false,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: true,
                }}
            >
                <DitherPlane shouldAnimate={shouldAnimate} />
            </Canvas>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,transparent_0%,rgba(10,10,15,0.18)_32%,rgba(10,10,15,0.88)_82%)]" />
        </div>
    )
}
