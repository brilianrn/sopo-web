import { farmerRoute } from "@/shared/constants";
import Link from "next/link";
import { AppsFarmerlandItemProps } from "../apps";
import { AppsNearestFarmerlandItem } from "./farmerland-item";

const farmerlands: AppsFarmerlandItemProps[] = [
  {
    distance: "5,52km",
    location: "Kabupaten Sidoarjo",
    ownerName: "Bambang Sugiono",
    photo: "/assets/images/farmer-1.webp",
    wide: 3.83,
  },
  {
    distance: "18km",
    location: "Kabupaten Pasuruan",
    ownerName: "Iqbal Maulana",
    photo: "/assets/images/farmer-1.webp",
    wide: 12.5,
  },
  {
    distance: "45km",
    location: "Malang",
    ownerName: "Budi Wibowo",
    photo: "/assets/images/farmer-1.webp",
    wide: 8.75,
  },
  {
    distance: "50km",
    location: "Jombang",
    ownerName: "Siti Nur Rohmah",
    photo: "/assets/images/farmer-1.webp",
    wide: 14.02,
  },
  {
    distance: "58km",
    location: "Mojokerto",
    ownerName: "Ujang",
    photo: "/assets/images/farmer-1.webp",
    wide: 14.2,
  },
];

export const AppsNearestFarmerland = () => {
  return (
    <div className="block">
      <div className="flex justify-between items-center px-4">
        <h2 className="font-bold text-xl truncate">Lahan Kosong Terdekat</h2>
        <Link
          className="text-ocean-default text-nowrap"
          href={farmerRoute.index}
        >
          Lihat Semua
        </Link>
      </div>
      <div
        className="flex gap-2 overflow-x-auto w-full no-scrollbar p-4 pt-2"
        style={{
          scrollSnapType: "x mandatory",
        }}
      >
        {farmerlands.map((item, index) => {
          return <AppsNearestFarmerlandItem key={index} {...item} />;
        })}
      </div>
    </div>
  );
};
