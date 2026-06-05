import LuauIcon from '@/assets/icons/luau.svg?react';
import CSharpIcon from '@/assets/icons/csharp.svg?react';
import PythonIcon from '@/assets/icons/python.svg?react';
import NextJSIcon from '@/assets/icons/nextjs.svg?react';
import TypescriptIcon from '@/assets/icons/typescript.svg?react';
import CssIcon from '@/assets/icons/css.svg?react';
import HtmlIcon from '@/assets/icons/html.svg?react';
import HaxeIcon from '@/assets/icons/haxe.svg?react';

export interface Technology {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    level: "mid" | "junior" | "senior";
    icon?: string;
}

export const technologies: Technology[] = [
    //Programming Languages
    { svg: LuauIcon, level: 'mid' },
    { svg: PythonIcon, level: 'mid' },
    { svg: HaxeIcon, level: 'mid' },
    { svg: CSharpIcon, level: 'junior' },
    { svg: TypescriptIcon, level: 'mid' },

    //Web Technologies
    { svg: HtmlIcon, level: 'mid' },
    { svg: CssIcon, level: 'mid' },
    { svg: NextJSIcon, level: 'junior' },
];
