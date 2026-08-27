import { execFileSync } from "node:child_process"
import { pathToFileURL } from "node:url"

const SKIP_BUILD = 0
const CONTINUE_BUILD = 1

export function containsDocumentationOnly(changedFiles) {
    return changedFiles.length > 0 && changedFiles.every((file) => file.toLowerCase().endsWith(".md"))
}

export function getChangedFiles(previousSha, currentSha = "HEAD") {
    return execFileSync("git", ["diff", "--name-only", "-z", previousSha, currentSha, "--"], {
        encoding: "utf8",
    })
        .split("\0")
        .filter(Boolean)
}

export function run() {
    const previousSha = process.env.VERCEL_GIT_PREVIOUS_SHA
    const currentSha = process.env.VERCEL_GIT_COMMIT_SHA || "HEAD"

    if (!previousSha) {
        console.log("Previous deployment SHA unavailable. Proceeding with build.")
        return CONTINUE_BUILD
    }

    try {
        const changedFiles = getChangedFiles(previousSha, currentSha)

        if (containsDocumentationOnly(changedFiles)) {
            console.log("Only Markdown documentation changed. Skipping build.")
            return SKIP_BUILD
        }

        console.log("Build-relevant changes detected. Proceeding with build.")
        return CONTINUE_BUILD
    } catch {
        console.log("Unable to calculate Git diff. Proceeding with build.")
        return CONTINUE_BUILD
    }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    process.exitCode = run()
}
