export type SkillCategoryId = "languages" | "frameworks" | "databases" | "tools"

export interface SkillItem {
    id: string
    name: string
    slug: string
    devicon: string
}

export interface SkillCategory {
    id: SkillCategoryId
    title: string
    description?: string
    skills: SkillItem[]
}
