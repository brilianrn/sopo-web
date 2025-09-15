import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/utils/index";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-default border-primary-default border text-white  hover:bg-primary-600 focus-visible:ring-primary-default/50",
        primaryOutline:
          "bg-transparent border border-transparent border border border-primary-default text-primary-default  hover:bg-primary-100 focus-visible:ring-primary-default/50",
        ocean:
          "bg-ocean-default border-ocean-default border text-white  hover:bg-ocean-600 focus-visible:ring-ocean-default/50",
        oceanOutline:
          "bg-transparent border border-transparent border border border-ocean-default text-ocean-default  hover:bg-ocean-100 focus-visible:ring-ocean-default/50",
        danger:
          "bg-danger-default border-danger-default border text-white  hover:bg-danger-600 focus-visible:ring-danger-default/50",
        dangerOutline:
          "bg-transparent border border-transparent border border border-danger-default text-danger-default  hover:bg-danger-100 focus-visible:ring-danger-default/50",
        warning:
          "bg-warning-default border-warning-default border text-white  hover:bg-warning-600 focus-visible:ring-warning-default/50",
        warningOutline:
          "bg-transparent border border-transparent border border border-warning-default text-warning-default  hover:bg-warning-100 focus-visible:ring-warning-default/50",
        secondary:
          "bg-gray-700 border-gray-700 border text-black/45  hover:bg-gray-600 focus-visible:ring-gray-default/50",
        secondaryOutline:
          "bg-transparent border border-transparent border border border-gray-300 text-black/45  hover:bg-gray-100 focus-visible:ring-gray-default/50",
      },
      size: {
        sm: "h-8 rounded-md text-xs px-3 has-[>svg]:px-2.5",
        md: "h-9 rounded-md text-sm px-4 has-[>svg]:px-3",
        lg: "h-10 rounded-md text-base px-6 has-[>svg]:px-4",
        xl: "h-11 rounded-lg text-lg px-7 has-[>svg]:px-5",
        "2xl": "h-12 rounded-lg text-xl px-8 has-[>svg]:px-6",
        "3xl": "h-14 rounded-xl text-2xl px-10 has-[>svg]:px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : "button";

  return (
    <div className="w-full">
      <Comp
        data-slot="button"
        className={cn("w-full", buttonVariants({ variant, size, className }))}
        {...props}
      />
    </div>
  );
};

export { Button, buttonVariants };
