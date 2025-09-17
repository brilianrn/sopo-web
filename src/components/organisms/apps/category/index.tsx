import { categoryRoute } from "@/shared/constants";
import { AppsCategoryItemProps } from "../apps";
import { AppsCategoryItem } from "./item";

const data: AppsCategoryItemProps[] = [
  {
    icon: "cat-education.png",
    label: "Pelatihan",
    seoTitle: "pelatihan",
  },
  {
    icon: "cat-seed.png",
    label: "Benih",
    seoTitle: "benih",
  },
  {
    icon: "cat-tools.png",
    label: "Sarana",
    seoTitle: "sarana",
  },
  {
    icon: "cat-environment.png",
    label: "Biochar",
    seoTitle: "biochar",
  },
  {
    icon: "cat-oil.png",
    label: "Minyak",
    seoTitle: "minyak",
  },
  {
    icon: "cat-supplement.png",
    label: "Suplemen",
    seoTitle: "suplemen",
  },
  {
    icon: "cat-beauty.png",
    label: "Kecantikan",
    seoTitle: "kecantikan",
  },
  {
    icon: "cat-others.png",
    label: "Lainnya",
    seoTitle: categoryRoute.index,
  },
];

export const AppsCategory = () => {
  return (
    <div className="grid grid-cols-4 gap-4 w-full px-4">
      {data.map((item, index) => (
        <AppsCategoryItem key={index} {...item} />
      ))}
    </div>
  );
};
