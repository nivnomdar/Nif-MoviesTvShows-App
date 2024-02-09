import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      ghost: ["hover:text-black", "hover:text-black", "hover:bg-blue-300"],
      blue: ["hover:text-black", "hover:text-black", "hover:bg-blue-300"],
      dark: [
        "hover:text-white",
        "hover:bg-secondary-dark",
        "hover:bg-blue-dark",
      ],
      red: ["hover:text-black", "hover:text-black", "hover:bg-red-300"],
    },
    size: {
      default: ["rounded", "p-2"],
      icon: [
        "rounded-full",
        "w-10",
        "flex",
        "items-center",
        "justify-center",
        "p-2.5",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
}
