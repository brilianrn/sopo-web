import { ReactNode } from "react";

export interface TopNavigationProps {
  className?: string;
  backHref?: string;
  title?: string;
  titlePosition?: "left" | "center";
  rightContent?: ReactNode;
}
