import { createBrowserRouter, Outlet } from "react-router-dom"
import { ScrollToTop } from "@/components/ScrollToTop"
import { Home } from "@/pages/Home"
import { Projects } from "@/pages/Projects"

function RootLayout() {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    )
}

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/projects",
                element: <Projects />,
            },
        ],
    },
])
