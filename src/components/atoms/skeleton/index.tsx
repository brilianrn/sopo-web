"use client";

import { cn } from "@/shared/utils";
import React from "react";

type SkeletonVariant = "square" | "ellipse";

interface SkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
}

const shimmer = (variant: SkeletonVariant) => `
<svg class="w-full h-full" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f0f0f0" offset="20%" />
      <stop stop-color="#e0e0e0" offset="50%" />
      <stop stop-color="#f0f0f0" offset="70%" />
    </linearGradient>
  </defs>
  ${
    variant === "ellipse"
      ? `<ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#f0f0f0"/> 
       <ellipse id="r" cx="50%" cy="50%" rx="50%" ry="50%" fill="url(#g)"/>`
      : `<rect width="100%" height="100%" fill="#f0f0f0" />
       <rect id="r" width="100%" height="100%" fill="url(#g)" />`
  }
  <animate xlink:href="#r" attributeName="x" from="-100%" to="100%" dur="1s" repeatCount="indefinite"  />
</svg>
`;

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "square",
  className,
}) => {
  return (
    <div
      className={cn("overflow-hidden", className)}
      dangerouslySetInnerHTML={{
        __html: shimmer(variant),
      }}
    />
  );
};
