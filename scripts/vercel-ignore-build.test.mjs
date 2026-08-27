import { describe, expect, it } from "vitest"
import { containsDocumentationOnly } from "./vercel-ignore-build.mjs"

describe("Vercel ignored build step", () => {
    it("skips changes made exclusively to Markdown documentation", () => {
        expect(containsDocumentationOnly(["README.md", "PRODUCT.md", "guides/setup.md"])).toBe(true)
    })

    it("continues the build when source code changes", () => {
        expect(containsDocumentationOnly(["README.md", "src/App.tsx"])).toBe(false)
    })

    it("continues the build for unknown or empty change sets", () => {
        expect(containsDocumentationOnly(["LICENSE"])).toBe(false)
        expect(containsDocumentationOnly([])).toBe(false)
    })
})
