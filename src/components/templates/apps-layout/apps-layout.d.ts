import { ReactNode } from "react";

export interface AppsLayoutProps {
  children: ReactNode;
}

export interface LayoutProps {
  useTopNavigation?: boolean;
  className?: string;
  children: ReactNode;
}
