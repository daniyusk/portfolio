/**
 * @author Daniyusk
 * @description Main entry point of the application
 * @license MIT
 * @version 1.0.0
 * @created 2026-04-02
 */

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@vidstack/react/player/styles/default/theme.css"
import "devicon/devicon.min.css"
import "@/index.css"
import App from "@/App.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
