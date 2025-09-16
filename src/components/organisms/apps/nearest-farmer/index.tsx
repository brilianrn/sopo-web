import { farmerRoute } from "@/shared/constants";
import Link from "next/link";
import { AppsFarmerItemProps } from "../apps";
import { AppsNearestFarmerItem } from "./farmer-item";

const farmers: AppsFarmerItemProps[] = [
  {
    distance: "5,52km",
    location: "Kabupaten Sidoarjo",
    name: "Rudy Saputra Aji Putra",
    photo: "/assets/images/farmer-1.webp",
  },
  {
    distance: "10km",
    location: "Pasuruan",
    name: "Agus Yayat Hidayat",
    photo: "/assets/images/farmer-1.webp",
  },
  {
    distance: "17km",
    location: "Surabaya",
    name: "Budi Wibowo",
    photo: "/assets/images/farmer-2.webp",
  },
  {
    distance: "18km",
    location: "Kabupaten Mojokerto",
    name: "Siti Nur Rohmah",
    photo: "/assets/images/farmer-3.webp",
  },
  {
    distance: "35km",
    location: "Kabupaten Bangkalan",
    name: "Tri Wahyuni",
    photo: "/assets/images/farmer-4.webp",
  },
];

export const AppsNearestFarmer = () => {
  return (
    <div className="block">
      <div className="flex justify-between items-center px-4">
        <h2 className="font-bold text-xl truncate">Petani Terdekat</h2>
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
        {farmers.map((item, index) => {
          return <AppsNearestFarmerItem key={index} {...item} />;
        })}
      </div>
    </div>
  );
};
