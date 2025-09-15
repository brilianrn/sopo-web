import { AppsCategoryItemProps } from "../apps";
import { AppsDocItem } from "./item";

const data: AppsCategoryItemProps[] = [
  {
    icon: "doc-sertification.png",
    label: "Sertifikasi",
    seoTitle: "/document/serification",
  },
  {
    icon: "doc-farmerland.png",
    label: "Pengolahan Lahan",
    seoTitle: "/document/farmerland",
  },
  {
    icon: "doc-regulation.png",
    label: "Regulasi",
    seoTitle: "/document/regulation",
  },
];

export const AppsDocuments = () => {
  return (
    <div className="space-y-2 px-4">
      <h2 className="font-bold text-xl">Dokumen</h2>
      <div className="grid grid-cols-3 items-center gap-2">
        {data.map((item, index) => (
          <AppsDocItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
