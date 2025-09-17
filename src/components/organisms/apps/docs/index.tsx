import { documentRoute } from "@/shared/constants";
import Link from "next/link";
import { AppsCategoryItemProps } from "../apps";
import { AppsDocItem } from "./item";

const data: AppsCategoryItemProps[] = [
  {
    icon: "doc-sertification.png",
    label: "Sertifikasi",
    seoTitle: documentRoute.detail("sertification"),
  },
  {
    icon: "doc-regulation.png",
    label: "Regulasi",
    seoTitle: documentRoute.detail("regulation"),
  },
  {
    icon: "doc-farmerland.png",
    label: "Pengolahan Lahan",
    seoTitle: documentRoute.detail("farmerland"),
  },
];

export const AppsDocuments = () => {
  return (
    <div className="space-y-2 px-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl truncate">Dokumen</h2>
        <Link
          className="text-ocean-default text-nowrap"
          href={documentRoute.index}
        >
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-3 items-center gap-2">
        {data.map((item, index) => (
          <AppsDocItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
