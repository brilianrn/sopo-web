"use client";

import { cn } from "@/shared/utils";
import { Check } from "lucide-react";
import { FC } from "react";

export const VerifyConfirmPassword: FC<{
  isValid?: boolean;
  label: string;
}> = ({ isValid, label }) => {
  return (
    <div
      className={cn(
        isValid ? "text-primary-default" : "text-gray-300",
        "flex items-center gap-2 text-sm"
      )}
    >
      <Check className="size-4" />
      <p>{label}</p>
    </div>
  );
};
