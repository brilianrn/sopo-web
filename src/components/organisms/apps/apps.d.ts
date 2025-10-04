import { ReactNode } from 'react';

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

export interface AppsFarmerItemProps {
  photo: string;
  name: string;
  location: string;
  distance: string;
  seoKey?: string;
}

export interface AppsFarmerlandItemProps {
  ownerName: string;
  location: string;
  distance?: string;
  photo: string;
  wide: number;
  seoKey?: string;
}
