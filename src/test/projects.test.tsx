import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import { MediaViewer } from "@/components/MediaViewer"
import { ProjectCard } from "@/components/ProjectCard"
import { ProjectGrid } from "@/components/ProjectGrid"
import { FeaturedProjectsSection } from "@/components/Projects"
import { getAllProjects, getAllTags, getFeaturedProjects, projectsData } from "@/data/projects"
import { Projects } from "@/pages/Projects"
import type { Project } from "@/types/project"

// Mock Dither to avoid WebGL context issues in unit test environment
vi.mock("@/components/Dither", () => ({
    Dither: () => <div data-testid="dither-mock" />,
}))

const mockSingleProject: Project = {
    id: "test-proj",
    title: "Test System Alpha",
    description: "A test project for unit assertions.",
    isFeatured: true,
    tags: ["React", "TypeScript", "Tailwind CSS"],
    media: [
        {
            type: "image",
            url: "https://example.com/image1.jpg",
            thumbnailUrl: "https://example.com/thumb1.jpg",
            alt: "Test Project Screenshot",
        },
        {
            type: "video",
            url: "https://example.com/demo.mp4",
            alt: "Test Project Demo Video",
        },
    ],
    links: {
        github: "https://github.com/daniyusk/test-proj",
        liveDemo: "https://test-proj.demo.app",
        caseStudy: "https://daniyusk.dev/cases/test-proj",
    },
}

describe("Projects Data Model & Helpers", () => {
    it("provides a valid mock dataset with 5 to 6 projects", () => {
        expect(projectsData.length).toBeGreaterThanOrEqual(5)
        for (const project of projectsData) {
            expect(project.id).toBeTruthy()
            expect(project.title).toBeTruthy()
            expect(project.description).toBeTruthy()
            expect(typeof project.isFeatured).toBe("boolean")
            expect(Array.isArray(project.tags)).toBe(true)
            expect(project.tags.length).toBeGreaterThan(0)
            expect(Array.isArray(project.media)).toBe(true)
            expect(project.media.length).toBeGreaterThan(0)
        }
    })

    it("getFeaturedProjects returns only featured projects", () => {
        const featured = getFeaturedProjects()
        expect(featured.length).toBeGreaterThan(0)
        expect(featured.every((p) => p.isFeatured)).toBe(true)
    })

    it("getAllProjects returns the complete list of projects", () => {
        const all = getAllProjects()
        expect(all.length).toBe(projectsData.length)
    })

    it("getAllTags returns sorted unique tags across all projects", () => {
        const tags = getAllTags()
        expect(tags.length).toBeGreaterThan(0)
        expect(tags.includes("React")).toBe(true)
        expect(tags.includes("TypeScript")).toBe(true)
    })
})

describe("MediaViewer Component", () => {
    it("renders image asset correctly", () => {
        render(
            <MediaViewer
                media={[
                    {
                        type: "image",
                        url: "https://example.com/pic.jpg",
                        alt: "Preview picture",
                    },
                ]}
            />,
        )

        const img = screen.getByRole("img", { name: /preview picture/i })
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute("src", "https://example.com/pic.jpg")
        expect(screen.getByText("IMG")).toBeInTheDocument()
    })

    it("renders video element when type is video", () => {
        const { container } = render(
            <MediaViewer
                media={[
                    {
                        type: "video",
                        url: "https://example.com/video.mp4",
                        alt: "Preview video",
                    },
                ]}
            />,
        )

        const video = container.querySelector("video")
        expect(video).toBeInTheDocument()
        expect(video).toHaveAttribute("src", "https://example.com/video.mp4")
    })

    it("displays error fallback on asset load error", () => {
        render(
            <MediaViewer
                media={[
                    {
                        type: "image",
                        url: "https://invalid-broken-domain.com/broken.jpg",
                        alt: "Broken image asset",
                    },
                ]}
            />,
        )

        const img = screen.getByRole("img", { name: /broken image asset/i })
        fireEvent.error(img)

        expect(screen.getByText(/Broken image asset/i)).toBeInTheDocument()
        expect(screen.getByText(/Could not load remote media stream/i)).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument()
    })

    it("renders empty state placeholder when no media is provided", () => {
        render(<MediaViewer media={[]} />)
        expect(screen.getByText(/no media available/i)).toBeInTheDocument()
    })

    it("navigates between multiple media assets", () => {
        render(<MediaViewer media={mockSingleProject.media} />)

        // Starts on first media (image)
        expect(screen.getByRole("img", { name: /test project screenshot/i })).toBeInTheDocument()

        // Click next arrow
        const nextButton = screen.getByRole("button", { name: /next preview media/i })
        fireEvent.click(nextButton)

        // Moves to second media (video)
        expect(screen.getByLabelText(/test project demo video/i)).toBeInTheDocument()
    })
})

describe("ProjectCard Component", () => {
    it("renders title, description, tags, and action links", () => {
        render(<ProjectCard project={mockSingleProject} />)

        expect(screen.getByText("Test System Alpha")).toBeInTheDocument()
        expect(screen.getByText("A test project for unit assertions.")).toBeInTheDocument()
        expect(screen.getByText("React")).toBeInTheDocument()
        expect(screen.getByText("TypeScript")).toBeInTheDocument()
        expect(screen.getByText("Tailwind CSS")).toBeInTheDocument()

        const liveDemo = screen.getByRole("link", { name: /view live demo/i })
        expect(liveDemo).toHaveAttribute("href", "https://test-proj.demo.app")

        const repoLink = screen.getByRole("link", { name: /view github repository/i })
        expect(repoLink).toHaveAttribute("href", "https://github.com/daniyusk/test-proj")

        const caseStudyLink = screen.getByRole("link", { name: /read case study/i })
        expect(caseStudyLink).toHaveAttribute("href", "https://daniyusk.dev/cases/test-proj")
    })

    it("shows featured badge when isFeatured is true and enabled", () => {
        render(<ProjectCard project={mockSingleProject} showFeaturedBadge={true} />)
        expect(screen.getByText("Featured")).toBeInTheDocument()
    })
})

describe("ProjectGrid Component", () => {
    it("renders project cards for all items provided", () => {
        render(<ProjectGrid projects={[mockSingleProject]} />)
        expect(screen.getByText("Test System Alpha")).toBeInTheDocument()
    })

    it("displays empty state message when list is empty", () => {
        render(<ProjectGrid projects={[]} emptyMessage="Custom empty message." />)
        expect(screen.getByText("Custom empty message.")).toBeInTheDocument()
    })
})

describe("FeaturedProjectsSection Component", () => {
    it("renders featured heading, featured projects, and CTA link to /projects", () => {
        render(
            <MemoryRouter>
                <FeaturedProjectsSection />
            </MemoryRouter>,
        )

        expect(screen.getByRole("heading", { name: /featured projects/i })).toBeInTheDocument()
        expect(screen.getAllByText(/view all projects/i).length).toBeGreaterThanOrEqual(1)

        const links = screen.getAllByRole("link", { name: /view all projects/i })
        expect(links[0]).toHaveAttribute("href", "/projects")
    })
})

describe("Projects Page Component", () => {
    it("renders full projects page with title, search bar, and tags", () => {
        render(
            <MemoryRouter>
                <Projects />
            </MemoryRouter>,
        )

        expect(screen.getByRole("heading", { name: /all projects & experiments/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute("href", "/")
        expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument()
    })

    it("filters projects when typing into search input", () => {
        render(
            <MemoryRouter>
                <Projects />
            </MemoryRouter>,
        )

        const input = screen.getByPlaceholderText(/search by title/i)
        fireEvent.change(input, { target: { value: "HyperTerminal" } })

        expect(screen.getByText("HyperTerminal Cloud Shell")).toBeInTheDocument()
        expect(screen.queryByText("Orbital 3D Engine & UI")).not.toBeInTheDocument()
    })

    it("filters projects when clicking on a tag button", () => {
        render(
            <MemoryRouter>
                <Projects />
            </MemoryRouter>,
        )

        // Find the tag button for 'Three.js'
        const threeJsButtons = screen.getAllByRole("button", { name: /three\.js/i })
        fireEvent.click(threeJsButtons[0])

        expect(screen.getByText("Orbital 3D Engine & UI")).toBeInTheDocument()
        expect(screen.queryByText("Nexus Flow Collaborative Canvas")).not.toBeInTheDocument()
    })
})
