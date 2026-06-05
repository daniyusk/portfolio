import LuauIcon from '@/assets/icons/luau.svg?react';
import TypescriptIcon from '@/assets/icons/typescript.svg?react';

export interface ProjectItem {
    title: string;
    description: string;
    media: { type: 'image' | 'video'; url: string }[];
}

export interface ProjectCategory {
    id: string;
    name: string;
    logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    items: ProjectItem[];
}

export const projectCategories: ProjectCategory[] = [
    {
        id: 'luau',
        name: 'Luau',
        logo: LuauIcon,
        items: [
            {
                title: 'Rojo Sync System',
                description: 'A robust and modular project structure built perfectly for Rojo within the Roblox engine. It handles data sync effortlessly across instances.',
                media: [
                    { type: 'image', url: 'https://placehold.co/1000x500/101018/00d2ff?text=Rojo+Project+Preview' }
                ]
            },
            {
                title: 'Simulator Engine',
                description: 'A complete framework for clicker simulator games, featuring data stores, replication, and optimized network code written in Luau.',
                media: [
                    { type: 'image', url: 'https://placehold.co/1000x500/101018/8a2be2?text=Simulator+Framework' }
                ]
            }
        ]
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        logo: TypescriptIcon,
        items: [
            {
                title: 'Liquid Glass Portfolio',
                description: 'An ultra-modern web application showcasing my personal projects, wrapped in a beautiful, dynamic glassmorphism dark theme using pure CSS and React.',
                media: [
                    { type: 'image', url: 'https://placehold.co/1000x500/101018/ffffff?text=Portfolio+Showcase' }
                ]
            }
        ]
    }
];
