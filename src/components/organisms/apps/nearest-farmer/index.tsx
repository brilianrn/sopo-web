import { farmerRoute } from '@/shared/constants';
import Link from 'next/link';
import { AppsFarmerItemProps } from '../apps';
import { AppsNearestFarmerItem } from './farmer-item';

const farmers: AppsFarmerItemProps[] = [
  {
    distance: `${Math.floor(Math.random() * 100) + 1}km`,
    location: 'Kabupaten Sidoarjo',
    name: 'Rudy Saputra Aji Putra',
    photo:
      'https://img.freepik.com/free-photo/joyful-gardener-man-wearing-gardening-hat-pretends-hold-looks_141793-70758.jpg?t=st=1758033352~exp=1758036952~hmac=8eae3b50e0211a41325f5afc6e3eb307fd8f91b7917866f320942188a3f0103e&w=2000',
    seoKey: `rudy-saputra-aji-putra-${Math.floor(Math.random() * 10000)}`,
  },
  {
    distance: `${Math.floor(Math.random() * 100) + 1}km`,
    location: 'Pasuruan',
    name: 'Agus Yayat Hidayat',
    photo:
      'https://img.freepik.com/free-photo/young-bearded-gardener-man-wearing-jumpsuit-hat-doing-selfie-smiling-showing-v-sign-standing-green-wall_141793-96834.jpg?t=st=1758033399~exp=1758036999~hmac=6b6409be9a731dda4b9119537375bc08d5fd4676df812642ac69a3eecbfdda2f&w=2000',
    seoKey: `agus-yayat-hidayat-${Math.floor(Math.random() * 10000)}`,
  },
  {
    distance: `${Math.floor(Math.random() * 100) + 1}km`,
    location: 'Surabaya',
    name: 'Budi Wibowo',
    photo:
      'https://img.freepik.com/free-photo/young-handsome-man-grey-shirt-summer-hat-with-serious-face_141793-55109.jpg?t=st=1758033418~exp=1758037018~hmac=7ecf0c840011a33f673521c3e79c4f6bcdaa7988e9377999f00434c81fe57f54&w=2000',
    seoKey: `budi-wibowo-${Math.floor(Math.random() * 10000)}`,
  },
  {
    distance: `${Math.floor(Math.random() * 100) + 1}km`,
    location: 'Kabupaten Mojokerto',
    name: 'Siti Nur Rohmah',
    photo:
      'https://img.freepik.com/free-photo/pleased-young-brunette-female-gardener-uniform-wearing-gardening-hat-stands-sideways_141793-98241.jpg?t=st=1758033486~exp=1758037086~hmac=3c620d1227bfad7dd08f3e65b7e03d47aacf41d3217095201e3f3b71ffe97fcc&w=2000',
    seoKey: `siti-nur-rohmah-${Math.floor(Math.random() * 10000)}`,
  },
  {
    distance: `${Math.floor(Math.random() * 100) + 1}km`,
    location: 'Kabupaten Bangkalan',
    name: 'Tri Handoko',
    photo:
      'https://img.freepik.com/free-photo/smart-happiness-asian-friendly-shop-owner-wear-brown-apron-portrait-half-body-smile-look-camera-isolate-white-background_609648-1656.jpg?t=st=1758033452~exp=1758037052~hmac=074eca45cc62408d0c9c09029cdc476b532e4f68e1eb00faf23d09f41cdc8744&w=2000',
    seoKey: `tri-handoko-${Math.floor(Math.random() * 10000)}`,
  },
];

export const AppsNearestFarmer = () => {
  return (
    <div className="block">
      <div className="flex justify-between items-center px-4">
        <h2 className="font-bold text-xl truncate">Petani Terdekat</h2>
        <Link className="text-ocean-default text-nowrap" href={farmerRoute.index}>
          Lihat Semua
        </Link>
      </div>
      <div
        className="flex gap-2 overflow-x-auto w-full no-scrollbar p-4 pt-2"
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {farmers.map((item, index) => {
          return <AppsNearestFarmerItem key={index} {...item} />;
        })}
      </div>
    </div>
  );
};
