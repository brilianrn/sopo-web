import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}
