"use client";

import { Button } from "@/components/atoms";
import Link from "next/link";

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center gap-2 bg-white">
      <div className='bg-[url("/assets/images/not-found.webp")] bg-cover bg-center bg-no-repeat w-[300px] h-[200px]' />
      <h1 className="text-2xl font-bold">Halaman Tidak Tersedia</h1>
      <p className="text-sm text-gray-500">Silahkan kembali ke halaman utama</p>
      <Link href="/apps">
        <Button variant="primary" size="lg" className="mt-4">
          Kembali ke halaman utama
        </Button>
      </Link>
    </div>
  );
};
