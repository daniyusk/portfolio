import type { SVGProps } from "react"

export interface TechIconProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    color?: string
}

export function SiVisualstudiocode({ size = 20, color = "default", className, ...props }: TechIconProps) {
    const fill = color === "default" ? "#007ACC" : color || "currentColor"
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={fill}
            className={className}
            aria-hidden="true"
            {...props}
        >
            <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
        </svg>
    )
}

export function SiVisualstudio({ size = 20, color = "default", className, ...props }: TechIconProps) {
    const fill = color === "default" ? "#5C2D91" : color || "currentColor"
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={fill}
            className={className}
            aria-hidden="true"
            {...props}
        >
            <path d="M17.584.072a1.696 1.696 0 0 0-1.077.408L7.87 8.01 3.42 4.417a1.082 1.082 0 0 0-1.385.035L.357 5.864a1.08 1.08 0 0 0-.012 1.542l3.86 3.525-3.86 3.525a1.08 1.08 0 0 0 .012 1.542l1.678 1.412a1.082 1.082 0 0 0 1.385.035l4.45-3.593 8.637 7.53a1.696 1.696 0 0 0 1.077.408c.328 0 .653-.095.933-.284l5.12-3.413a1.697 1.697 0 0 0 .753-1.413V3.344a1.697 1.697 0 0 0-.753-1.413L18.517.284A1.688 1.688 0 0 0 17.584.072zm.416 5.848v12.16l-7.79-6.08z" />
        </svg>
    )
}

export function SiCsharp({ size = 20, color = "default", className, ...props }: TechIconProps) {
    const fill = color === "default" ? "#239120" : color || "currentColor"
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={fill}
            className={className}
            aria-hidden="true"
            {...props}
        >
            <path d="M11.996 0a12 12 0 0 0-7.39 2.548 11.995 11.995 0 0 0-4.088 6.946 12.001 12.001 0 0 0 1.99 9.387 11.996 11.996 0 0 0 7.747 5.015 12.004 12.004 0 0 0 9.539-1.992 11.996 11.996 0 0 0 4.204-7.228h-3.48a8.688 8.688 0 0 1-2.956 4.974 8.702 8.702 0 0 1-5.748 1.554 8.694 8.694 0 0 1-5.59-3.627 8.701 8.701 0 0 1-1.442-6.78 8.696 8.696 0 0 1 2.96-5.02 8.7 8.7 0 0 1 5.344-1.84 8.698 8.698 0 0 1 5.485 1.764 8.69 8.69 0 0 1 2.973 4.954h3.486a11.996 11.996 0 0 0-4.22-7.217A11.995 11.995 0 0 0 11.996 0zm7.848 9.07v1.89h1.89v-1.89h1.26v1.89h1.89v1.26h-1.89v1.89h1.89v1.26h-1.89v1.89h-1.26v-1.89h-1.89v1.89h-1.26v-1.89h-1.89v-1.26h1.89v-1.89h-1.89v-1.26h1.89v-1.89zm1.26 3.15v1.89h1.89v-1.89z" />
        </svg>
    )
}

export function SiHaxeflixel({ size = 20, color = "default", className, ...props }: TechIconProps) {
    const fill = color === "default" ? "#00CC33" : color || "currentColor"
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={fill}
            className={className}
            aria-hidden="true"
            {...props}
        >
            <path d="M3 3h18v18H3z M6 6h12v12H6z M9 9h6v6H9z" />
        </svg>
    )
}
