import { ReactNode } from "react";

export interface AppsBannerItemCountProps {
  total: number;
  label: ReactNode;
  icon: ReactNode | string;
}

export interface AppsCategoryItemProps {
  icon: ReactNode | string;
  label: ReactNode;
  seoTitle: string;
}
