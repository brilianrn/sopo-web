import { farmerRoute } from "@/shared/constants";
import Link from "next/link";
import { AppsFarmerlandItemProps } from "../apps";
import { AppsNearestFarmerlandItem } from "./farmerland-item";

const farmerlands: AppsFarmerlandItemProps[] = [
  {
    distance: "5,52km",
    location: "Kabupaten Sidoarjo",
    ownerName: "Bambang Sugiono",
    photo:
      "https://img.freepik.com/free-photo/aerial-shot-farmland-clear-sky-eifel-region-germany_181624-26567.jpg?t=st=1758033248~exp=1758036848~hmac=efae6e438a0f5b5348b5dba06ac0930b78dd522a035e4bc0218ab9c4d1be58e7&w=2000",
    wide: 3.83,
  },
  {
    distance: "18km",
    location: "Kabupaten Pasuruan",
    ownerName: "Iqbal Maulana",
    photo:
      "https://img.freepik.com/free-photo/farmland_1112-1236.jpg?t=st=1758033107~exp=1758036707~hmac=db7972d49ca5c625c6c1c36d82a5670d70e75ba3514f0fd594adc0689907d445&w=2000",
    wide: 12.5,
  },
  {
    distance: "45km",
    location: "Malang",
    ownerName: "Budi Wibowo",
    photo:
      "https://img.freepik.com/free-photo/beautiful-farmland-matsuda-kanagawa-japan_181624-48623.jpg?t=st=1758033175~exp=1758036775~hmac=282e2aa3a0ccf5bb3c61faf1a2a99801cd3cf762cb4282c2824516dbded41f97&w=2000",
    wide: 8.75,
  },
  {
    distance: "50km",
    location: "Jombang",
    ownerName: "Siti Nur Rohmah",
    photo:
      "https://img.freepik.com/free-photo/green-landscape-with-mountain_181624-10229.jpg?t=st=1758033209~exp=1758036809~hmac=f0d67fe56238400c611fbd26239a85e4b7cfd8e5f87e60fe1f05e4f0bf0e1b13&w=2000",
    wide: 14.02,
  },
  {
    distance: "58km",
    location: "Mojokerto",
    ownerName: "Ujang",
    photo:
      "https://img.freepik.com/free-photo/forest-evening-nature-sun-heaven_1232-3766.jpg?t=st=1758033024~exp=1758036624~hmac=9735a9eaae194bfc3d33c9319b3af809a05811b8cedaf260016ea3303d0df577&w=1480",
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
