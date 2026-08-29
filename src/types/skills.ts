import type { ComponentType, SVGProps } from "react"

export type SkillCategoryId = "languages" | "frameworks" | "databases" | "tools"

export type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; color?: string }>

export interface SkillItem {
    id: string
    name: string
    slug: string
    Icon: IconComponent
    color?: string
}

export interface SkillCategory {
    id: SkillCategoryId
    title: string
    description?: string
    skills: SkillItem[]
}
