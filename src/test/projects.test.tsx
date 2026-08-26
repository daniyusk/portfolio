import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
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
    category: "Roblox Games",
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
    it("provides the two real Roblox projects", () => {
        expect(projectsData).toHaveLength(2)
        expect(projectsData.map((project) => project.id)).toEqual(["steal-a-garden", "project-far"])
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
        const project = getProjectById("steal-a-garden")
        expect(project).toBeDefined()
        expect(project?.title).toBe("Steal a Garden")

        const nonExistent = getProjectById("non-existent-id")
        expect(nonExistent).toBeUndefined()
    })

    it("registers broadly compatible local MP4 previews without video thumbnails", () => {
        const stealAGarden = getProjectById("steal-a-garden")
        const projectFar = getProjectById("project-far")

        expect(stealAGarden?.media).toHaveLength(1)
        expect(stealAGarden?.cover?.url).toBe("/media/projects/steal-a-garden-cover.webp")
        expect(stealAGarden?.media[0]?.url).toBe("/media/projects/steal-a-garden-combat.mp4")
        expect(stealAGarden?.media[0]).not.toHaveProperty("thumbnailUrl")
        expect(stealAGarden?.media[0]).toMatchObject({
            fitMode: "contain",
            previewTimestamp: 2.5,
            playbackRange: { start: 2, end: 16 },
        })

        expect(projectFar?.media).toHaveLength(2)
        expect(projectFar?.cover?.url).toBe("/media/projects/project-far-cover.webp")
        expect(projectFar?.media.every((media) => media.type === "video" && media.url.endsWith(".mp4"))).toBe(true)
        expect(projectFar?.media.every((media) => !("thumbnailUrl" in media))).toBe(true)
        expect(projectFar?.media.some((media) => media.url === projectFar.cover?.url)).toBe(false)
    })

    it("getAllTags returns sorted unique tags across all projects", () => {
        const tags = getAllTags()
        expect(tags.length).toBeGreaterThan(0)
        expect(tags.includes("Roblox")).toBe(true)
        expect(tags.includes("Luau")).toBe(true)
        expect(tags).toEqual([...tags].sort())
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

    it("renders Vidstack media primitives and cosmic controls without native controls", () => {
        const { container } = render(
            <MediaViewer
                media={[
                    {
                        type: "video",
                        url: "https://example.com/video.mp4",
                        alt: "Preview video",
                        fitMode: "contain",
                    },
                ]}
            />,
        )

        const video = container.querySelector("[data-media-provider] video")
        const player = container.querySelector("[data-media-player]")
        expect(video).toBeInTheDocument()
        expect(player).toHaveAttribute("data-media-player")
        expect(player).toHaveAttribute("data-muted")
        expect(video).not.toHaveAttribute("controls")
        expect(container.querySelector("[data-media-provider]")).toHaveClass("[&>video]:object-contain")
        expect(container.querySelector('video[src="https://example.com/video.mp4"].scale-125')).toBeInTheDocument()
        expect(container.querySelector("img")).not.toBeInTheDocument()
        expect(player).not.toHaveAttribute("data-poster")
        expect(screen.getAllByRole("button", { name: /play/i })).toHaveLength(2)
        expect(screen.getByRole("button", { name: /mute/i })).toBeInTheDocument()
        expect(container.querySelector(".cosmic-volume-slider")).toBeInTheDocument()
    })

    it("delegates the configured playback range and looping to Vidstack", () => {
        const { container } = render(
            <MediaViewer
                media={[
                    {
                        type: "video",
                        url: "https://example.com/ranged.mp4",
                        alt: "Ranged preview",
                        playbackRange: { start: 3, end: 8 },
                    },
                ]}
            />,
        )
        const player = container.querySelector("[data-media-player]")

        expect(player).toHaveAttribute("data-clip-start", "3")
        expect(player).toHaveAttribute("data-clip-end", "8")
        expect(player).toHaveAttribute("data-loop")
    })

    it("renders the native Vidstack timeline with a time-only hover preview", () => {
        const { container } = render(
            <MediaViewer
                media={[
                    {
                        type: "video",
                        url: "https://example.com/timeline.mp4",
                        alt: "Timeline preview",
                        playbackRange: { start: 2, end: 12 },
                    },
                ]}
            />,
        )
        const slider = screen.getByRole("slider", { name: /video progress/i })

        expect(slider).toHaveAttribute("data-media-time-slider")
        expect(slider).toHaveAttribute("aria-valuemin", "0")
        expect(slider).toHaveAttribute("aria-valuemax", "100")
        expect(container.querySelector(".cosmic-slider-preview")).toBeInTheDocument()
        expect(container.querySelector(".cosmic-slider-value")).toBeInTheDocument()
        expect(container.querySelector(".cosmic-slider-preview img")).not.toBeInTheDocument()
    })

    it("exposes Vidstack keyboard shortcuts on playback controls", () => {
        render(
            <MediaViewer
                media={[
                    {
                        type: "video",
                        url: "https://example.com/keyboard.mp4",
                        alt: "Keyboard preview",
                    },
                ]}
            />,
        )

        for (const playButton of screen.getAllByRole("button", { name: /play/i })) {
            expect(playButton).toHaveAttribute("aria-keyshortcuts", "k Space")
        }
    })

    it("uses separate Vidstack gestures for desktop playback and mobile control reveal", () => {
        const { container } = render(
            <MediaViewer
                media={[
                    {
                        type: "video",
                        url: "https://example.com/touch.mp4",
                        alt: "Touch preview",
                        playbackRange: { start: 1, end: 6 },
                    },
                ]}
            />,
        )

        expect(container.querySelector('[data-media-gesture][action="toggle:paused"]')).toBeInTheDocument()
        expect(container.querySelector('[data-media-gesture][action="toggle:controls"]')).toBeInTheDocument()
        expect(container.querySelector(".cosmic-controls")).toBeInTheDocument()
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
        expect(screen.getByRole("region", { name: /test project demo video/i })).toBeInTheDocument()
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
        const videoProject: Project = {
            ...mockSingleProject,
            cover: {
                url: "https://example.com/cover.jpg",
                alt: "Dedicated project cover",
            },
            media: [
                {
                    type: "video",
                    url: "https://example.com/demo.mp4",
                    alt: "Static video preview",
                    fitMode: "contain",
                    previewTimestamp: 3,
                    playbackRange: { start: 2, end: 7 },
                },
            ],
        }

        const { container } = render(<ProjectCard project={videoProject} />)
        const player = container.querySelector("[data-media-player]")
        const card = screen.getByRole("button", { name: /view details for test system alpha/i })

        expect(player).not.toHaveAttribute("data-autoplay")
        expect(player).toHaveAttribute("data-loop")
        expect(player).toHaveAttribute("data-muted")
        expect(player).toHaveAttribute("data-load", "eager")
        expect(player).toHaveAttribute("data-preview-start", "3")
        expect(player).toHaveAttribute("data-clip-end", "7")
        expect(player).not.toHaveAttribute("data-poster")
        expect(container.querySelector("[data-media-provider]")).toHaveClass("[&>video]:object-cover")
        expect(container.querySelector("video")).toHaveClass("object-cover")
        expect(container.querySelector("video")).toHaveStyle({ objectFit: "cover" })
        expect(player).toHaveClass("opacity-0")
        const cover = screen.getByRole("img", { name: /dedicated project cover/i })
        expect(cover).toHaveClass("object-cover")
        expect(cover).toHaveAttribute("src", "https://example.com/cover.jpg")
        expect(container.querySelectorAll("img")).toHaveLength(1)

        fireEvent.mouseEnter(card)
        expect(player).toHaveClass("opacity-100")

        fireEvent.mouseLeave(card)
        expect(player).toHaveClass("opacity-0")
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

    it("keeps the static cover visible when a video preview fails", async () => {
        const videoProject: Project = {
            ...mockSingleProject,
            cover: {
                url: "https://example.com/cover.jpg",
                alt: "Fallback project cover",
            },
            media: [
                {
                    type: "video",
                    url: "https://example.com/broken.mp4",
                    alt: "Broken video preview",
                },
            ],
        }

        const { container } = render(<ProjectCard project={videoProject} />)
        const player = container.querySelector("[data-media-player]")
        const video = container.querySelector("video")

        fireEvent.error(video as HTMLVideoElement)
        fireEvent.mouseEnter(screen.getByRole("button", { name: /view details for test system alpha/i }))

        await waitFor(() => expect(player).toHaveClass("opacity-0"))
        expect(screen.getByRole("img", { name: /fallback project cover/i })).toBeVisible()
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

    it("keeps the card cover out of the modal media gallery", () => {
        const projectFar = getProjectById("project-far")
        expect(projectFar).toBeDefined()

        render(<ProjectModal project={projectFar ?? null} isOpen={true} onClose={vi.fn()} />)
        const player = screen.getByRole("region", { name: /project far reactive main menu/i })

        expect(player).toHaveAttribute("data-source", "/media/projects/project-far-menu.mp4")
        expect(player).not.toHaveAttribute("data-poster")
        expect(document.querySelectorAll("video")).toHaveLength(2)
        expect(document.querySelector("video.scale-125")).toHaveClass("blur-2xl", "opacity-40", "brightness-75")
        expect(document.querySelector(".cosmic-slider-preview img")).not.toBeInTheDocument()
        expect(screen.queryByRole("img", { name: /project far logo cover/i })).not.toBeInTheDocument()
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

        // Default active is the first featured project, clicking it opens the modal.
        const projectPanel = screen.getByRole("button", { name: /project: steal a garden/i })
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

        const projectPanel = screen.getByRole("button", { name: /project: project: far/i })
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
        expect(screen.getByRole("heading", { name: /roblox games/i })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /next projects in roblox games/i })).toBeInTheDocument()
    })

    it("moves keyboard focus between cards with arrow keys", () => {
        render(
            <MemoryRouter>
                <Projects />
            </MemoryRouter>,
        )

        const firstCard = screen.getByRole("button", { name: /view details for steal a garden/i })
        const nextCard = screen.getByRole("button", { name: /view details for project: far/i })
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

        const firstCard = screen.getByRole("button", { name: /view details for steal a garden/i })
        fireEvent.click(firstCard)

        const dialog = screen.getByRole("dialog")
        expect(dialog).toBeInTheDocument()
        expect(within(dialog).getByText(getProjectById("steal-a-garden")?.shortDescription ?? "")).toBeInTheDocument()
    })
})
