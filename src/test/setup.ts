import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

// Mock window.matchMedia for tests (jsdom doesn't support it natively)
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Mock ResizeObserver
globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

// Mock Three.js / OGL / Canvas 2D / WebGL context for headless tests
const createMockWebGLContext = () => ({
    clearColor: vi.fn(),
    enable: vi.fn(),
    blendFunc: vi.fn(),
    viewport: vi.fn(),
    getExtension: vi.fn(),
    createShader: vi.fn(),
    shaderSource: vi.fn(),
    compileShader: vi.fn(),
    getShaderParameter: vi.fn().mockReturnValue(true),
    getShaderInfoLog: vi.fn(),
    createProgram: vi.fn(),
    attachShader: vi.fn(),
    linkProgram: vi.fn(),
    getProgramParameter: vi.fn().mockReturnValue(true),
    useProgram: vi.fn(),
    createBuffer: vi.fn(),
    bindBuffer: vi.fn(),
    bufferData: vi.fn(),
    createVertexArray: vi.fn(),
    bindVertexArray: vi.fn(),
    getUniformLocation: vi.fn(),
    getAttribLocation: vi.fn(),
    canvas: {
        width: 100,
        height: 100,
        style: {},
        remove: vi.fn(),
    },
})

HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation((contextId: string) => {
    if (contextId === "webgl" || contextId === "webgl2" || contextId === "experimental-webgl") {
        return createMockWebGLContext()
    }
    return null
}) as unknown as typeof HTMLCanvasElement.prototype.getContext
