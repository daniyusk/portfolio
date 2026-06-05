import type React from "react";
import { cva } from "class-variance-authority";
import { glassBase } from "@/styles/glass";
import { cn } from "@/styles/utils";

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

interface ButtonLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: "primary" | "secondary";
}

const buttonVariants = cva(
    `
        inline-flex
        min-h-12
        w-full
        items-center
        justify-center
        gap-3
        rounded-xl
        px-5
        py-3
        text-base
        font-semibold
        transition-colors
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-violet-400
        sm:w-auto
        sm:text-lg
        [&>svg]:h-5
        [&>svg]:w-5
        [&>svg]:shrink-0
    `,
    {
        variants: {
            variant: {
                primary:
                    `${glassBase} bg-violet-600 text-white hover:bg-violet-500`,

                secondary:
                    `
                        border
                        border-violet-600
                        bg-transparent
                        text-violet-500
                        hover:border-violet-500
                        hover:text-violet-400
                    `,
            },
        },

        defaultVariants: {
            variant: "primary",
        },
    }
);

export function Button({
    variant = "primary",
    className,
    ...props
}: ButtonProps) {

    return (
        <button
            className={cn(buttonVariants({ variant }), className)}
            {...props}
        />
    );

}

export function ButtonLink({
    variant = "primary",
    className,
    ...props
}: ButtonLinkProps) {

    return (
        <a
            className={cn(buttonVariants({ variant }), className)}
            {...props}
        />
    );

}
