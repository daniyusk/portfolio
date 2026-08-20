import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { ButtonLink } from "@/components/Buttons"
import { ProfileTilt } from "@/components/ProfileTilt"
import { Home } from "@/pages/Home"

// Mock Dither to avoid WebGL complex rendering in unit tests
vi.mock("@/components/Dither", () => ({
    Dither: () => <div data-testid="dither-mock" />,
}))

describe("Smoke Tests - Core Components", () => {
    it("renders Home page with title and navigation buttons", () => {
        render(<Home />)

        expect(screen.getByRole("heading", { name: /daniyusk/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /view projects/i })).toHaveAttribute("href", "#projects")
        expect(screen.getByRole("link", { name: /contact me/i })).toHaveAttribute("href", "#contact")
    })

    it("renders ButtonLink component correctly", () => {
        render(
            <ButtonLink href="https://example.com" variant="primary">
                Click here
            </ButtonLink>,
        )

        const link = screen.getByRole("link", { name: /click here/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "https://example.com")
    })

    it("renders ProfileTilt with accessible GitHub link", () => {
        render(<ProfileTilt />)

        const githubLink = screen.getByRole("link", { name: /daniyusk.*github/i })
        expect(githubLink).toBeInTheDocument()
        expect(githubLink).toHaveAttribute("href", "https://github.com/daniyusk")
        expect(githubLink).toHaveAttribute("target", "_blank")
    })

    it("renders ContactSection with pixel art links and heading", () => {
        render(<Home />)

        expect(screen.getByRole("heading", { name: /let's build something togheter/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
            "href",
            "https://www.linkedin.com/in/daniel-senzaki-132905407/",
        )
        expect(
            screen.getAllByRole("link", { name: /github/i })[1] ?? screen.getByRole("link", { name: /github/i }),
        ).toHaveAttribute("href", "https://github.com/daniyusk")
        expect(screen.getByRole("link", { name: /discord/i })).toHaveAttribute(
            "href",
            "https://discord.com/users/670030102490382346",
        )
    })

    it("renders AboutSection with education and olympiad awards", () => {
        render(<Home />)

        expect(screen.getByRole("heading", { name: /engineering systems with logic/i })).toBeInTheDocument()
        expect(screen.getAllByText(/cotuca \(unicamp\)/i).length).toBeGreaterThan(0)
        expect(screen.getByText(/2x bronze medalist at obmep/i)).toBeInTheDocument()
        expect(screen.getByText(/silver medalist at omasp/i)).toBeInTheDocument()
    })
})
