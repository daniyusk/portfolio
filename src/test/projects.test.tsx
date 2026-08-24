import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import { MediaViewer } from "@/components/MediaViewer"
import { ProjectCard } from "@/components/ProjectCard"
import { ProjectGrid } from "@/components/ProjectGrid"
import { ProjectModal } from "@/components/ProjectModal"
import { FeaturedProjectsSection } from "@/components/Projects"
import { getAllProjects, getAllTags, getFeaturedProjects, getProjectById, projectsData } from "@/data/projects"
import { Projects } from "@/pages/Projects"
import type { Project } from "@/types/project"

// Mock Dither to avoid WebGL context issues in unit test environment
vi.mock("@/components/Dither", () => ({
    Dither: () => <div data-testid="dither-mock" />,
}))

const mockSingleProject: Project = {
    id: "test-proj",
    title: "Test System Alpha",
    category: "Web Applications",
    shortDescription: "A concise test summary for cards.",
    fullDescription: "A comprehensive deep dive description for modal exploration with detailed architecture.",
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
            expect(project.category).toBeTruthy()
            expect(project.shortDescription).toBeTruthy()
            expect(project.fullDescription).toBeTruthy()
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

    it("getProjectById returns the correct project or undefined", () => {
        const project = getProjectById("orbital-ui")
        expect(project).toBeDefined()
        expect(project?.title).toBe("Orbital 3D Engine & UI")

        const nonExistent = getProjectById("non-existent-id")
        expect(nonExistent).toBeUndefined()
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
        expect(screen.queryByText("IMG")).not.toBeInTheDocument()
    })

    it("renders video element with controls and muted playback", () => {
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
        expect(video?.muted).toBe(true)
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
    it("renders title, shortDescription, tags, and handles selection click", () => {
        const onSelect = vi.fn()
        render(<ProjectCard project={mockSingleProject} onSelect={onSelect} />)

        expect(screen.getByText("Test System Alpha")).toBeInTheDocument()
        expect(screen.getByText("A concise test summary for cards.")).toBeInTheDocument()
        expect(screen.getByText("React")).toBeInTheDocument()
        expect(screen.getByText("TypeScript")).toBeInTheDocument()
        expect(screen.getByText("Tailwind CSS")).toBeInTheDocument()

        const card = screen.getByRole("button", { name: /view details for test system alpha/i })
        fireEvent.click(card)
        expect(onSelect).toHaveBeenCalledWith(mockSingleProject)
    })

    it("triggers selection when pressing Enter or Space key", () => {
        const onSelect = vi.fn()
        render(<ProjectCard project={mockSingleProject} onSelect={onSelect} />)

        const card = screen.getByRole("button", { name: /view details for test system alpha/i })
        fireEvent.keyDown(card, { key: "Enter" })
        expect(onSelect).toHaveBeenCalledTimes(1)

        fireEvent.keyDown(card, { key: " " })
        expect(onSelect).toHaveBeenCalledTimes(2)
    })

    it("does not render numeric or featured indexing labels", () => {
        render(<ProjectCard project={mockSingleProject} />)
        expect(screen.queryByText("Featured")).not.toBeInTheDocument()
        expect(screen.queryByText("01")).not.toBeInTheDocument()
    })

    it("plays video previews only while hovered and resets them afterward", () => {
        const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue()
        const pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined)
        const videoProject: Project = {
            ...mockSingleProject,
            media: [
                {
                    type: "video",
                    url: "https://example.com/demo.mp4",
                    thumbnailUrl: "https://example.com/poster.jpg",
                    alt: "Static video preview",
                },
            ],
        }

        const { container } = render(<ProjectCard project={videoProject} />)
        const video = container.querySelector("video")
        const card = screen.getByRole("button", { name: /view details for test system alpha/i })

        expect(video).not.toHaveAttribute("autoplay")
        expect(video).toHaveAttribute("loop")
        expect(video?.muted).toBe(true)

        fireEvent.mouseEnter(card)
        expect(play).toHaveBeenCalledTimes(1)

        fireEvent.mouseLeave(card)
        expect(pause).toHaveBeenCalledTimes(1)
        expect(video?.currentTime).toBe(0)

        play.mockRestore()
        pause.mockRestore()
    })

    it("keeps GIF thumbnails static until hover", () => {
        const gifProject: Project = {
            ...mockSingleProject,
            media: [
                {
                    type: "gif",
                    url: "https://example.com/animated.gif",
                    thumbnailUrl: "https://example.com/frozen.jpg",
                    alt: "Frozen GIF preview",
                },
            ],
        }

        const { container } = render(<ProjectCard project={gifProject} />)
        const card = screen.getByRole("button", { name: /view details for test system alpha/i })

        expect(container.querySelectorAll("img")).toHaveLength(1)
        expect(container.querySelector("img")).toHaveAttribute("src", "https://example.com/frozen.jpg")

        fireEvent.mouseEnter(card)
        expect(container.querySelectorAll("img")).toHaveLength(2)

        fireEvent.mouseLeave(card)
        expect(container.querySelectorAll("img")).toHaveLength(1)
    })
})

describe("ProjectModal Component", () => {
    it("does not render when isOpen is false or project is null", () => {
        const { queryByTestId } = render(<ProjectModal project={mockSingleProject} isOpen={false} onClose={vi.fn()} />)
        expect(queryByTestId("project-modal")).toBeNull()
    })

    it("renders full project details, tags, media, and external action links when open", () => {
        render(<ProjectModal project={mockSingleProject} isOpen={true} onClose={vi.fn()} />)

        expect(screen.getByRole("dialog")).toBeInTheDocument()
        expect(screen.getByText("Test System Alpha")).toBeInTheDocument()
        expect(screen.queryByText(/featured project/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/project archive/i)).not.toBeInTheDocument()
        expect(screen.getByText("A concise test summary for cards.")).toBeInTheDocument()
        expect(screen.queryByText(/overview & architecture/i)).not.toBeInTheDocument()

        // Action links
        const demoLink = screen.getByRole("link", { name: /open live demo/i })
        expect(demoLink).toHaveAttribute("href", "https://test-proj.demo.app")

        const repoLink = screen.getByRole("link", { name: /view github repository/i })
        expect(repoLink).toHaveAttribute("href", "https://github.com/daniyusk/test-proj")

        const caseStudyLink = screen.getByRole("link", { name: /read case study/i })
        expect(caseStudyLink).toHaveAttribute("href", "https://daniyusk.dev/cases/test-proj")
    })

    it("calls onClose when clicking close button or pressing Escape", () => {
        const onClose = vi.fn()
        render(<ProjectModal project={mockSingleProject} isOpen={true} onClose={onClose} />)

        const closeBtn = screen.getByRole("button", { name: /close project modal/i })
        fireEvent.click(closeBtn)
        expect(onClose).toHaveBeenCalledTimes(1)

        fireEvent.keyDown(window, { key: "Escape" })
        expect(onClose).toHaveBeenCalledTimes(2)
    })
})

describe("ProjectGrid Component", () => {
    it("renders project cards and forwards selection handler", () => {
        const onSelect = vi.fn()
        render(<ProjectGrid projects={[mockSingleProject]} onSelectProject={onSelect} />)

        expect(screen.getByText("Test System Alpha")).toBeInTheDocument()
        const card = screen.getByRole("button", { name: /view details for test system alpha/i })
        fireEvent.click(card)
        expect(onSelect).toHaveBeenCalledWith(mockSingleProject)
    })

    it("displays empty state message when list is empty", () => {
        render(<ProjectGrid projects={[]} emptyMessage="Custom empty message." />)
        expect(screen.getByText("Custom empty message.")).toBeInTheDocument()
    })
})

describe("FeaturedProjectsSection Component", () => {
    it("renders featured heading, featured project slides, and CTA link to /projects", () => {
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

    it("renders accordion gallery and opens project modal on click", () => {
        render(
            <MemoryRouter>
                <FeaturedProjectsSection />
            </MemoryRouter>,
        )

        // Default active is project 1 (Orbital 3D Engine & UI), clicking it opens modal
        const projectPanel = screen.getByRole("button", { name: /project: orbital 3d engine & ui/i })
        fireEvent.click(projectPanel)

        // Modal should now be open
        expect(screen.getByRole("dialog")).toBeInTheDocument()
    })

    it("requires two touches to open the selected accordion project", () => {
        render(
            <MemoryRouter>
                <FeaturedProjectsSection />
            </MemoryRouter>,
        )

        const projectPanel = screen.getByRole("button", { name: /project: nexus flow collaborative canvas/i })
        fireEvent.pointerDown(projectPanel, { pointerType: "touch" })
        fireEvent.focus(projectPanel)
        fireEvent.click(projectPanel)
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
        expect(projectPanel).toHaveAttribute("aria-current", "true")

        fireEvent.pointerDown(projectPanel, { pointerType: "touch" })
        fireEvent.click(projectPanel)
        expect(screen.getByRole("dialog")).toBeInTheDocument()
    })
})

describe("Projects Page Component", () => {
    it("renders the category carousels without search or filter controls", () => {
        render(
            <MemoryRouter>
                <Projects />
            </MemoryRouter>,
        )

        expect(screen.getByRole("heading", { name: /^projects$/i, level: 1 })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute("href", "/")
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
        expect(screen.queryByText(/^filter$/i)).not.toBeInTheDocument()
        expect(screen.getByRole("heading", { name: /interactive experiences/i })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /next projects in web applications/i })).toBeInTheDocument()
    })

    it("moves keyboard focus between cards with arrow keys", () => {
        render(
            <MemoryRouter>
                <Projects />
            </MemoryRouter>,
        )

        const firstCard = screen.getByRole("button", { name: /view details for orbital 3d engine & ui/i })
        const nextCard = screen.getByRole("button", { name: /view details for pulse spatial audio synthesizer/i })
        firstCard.focus()
        fireEvent.keyDown(firstCard, { key: "ArrowRight" })
        expect(nextCard).toHaveFocus()
    })

    it("opens ProjectModal when clicking on a project card in the grid", () => {
        render(
            <MemoryRouter>
                <Projects />
            </MemoryRouter>,
        )

        const firstCard = screen.getByRole("button", { name: /view details for orbital 3d engine & ui/i })
        fireEvent.click(firstCard)

        const dialog = screen.getByRole("dialog")
        expect(dialog).toBeInTheDocument()
        expect(within(dialog).getByText(projectsData[0].shortDescription)).toBeInTheDocument()
    })
})
