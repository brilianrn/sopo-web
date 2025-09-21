"use client";

import { Button } from "@/components/atoms";
import { authRoute } from "@/shared/constants";
import styles from "@/shared/styles/packages/landing-page.module.css";
import Image from "next/image";
import Link from "next/link";
import { BgBadge, ImAppIphone } from "../../../../../public/assets/images";

export const DashboardView = () => {
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* HERO SECTION */}
      <section className={styles.dashboard}>
        <div className={styles["dashboard-blur"]}>
          <Image
            src={BgBadge}
            alt="sopo logo"
            priority
            className="absolute left-1/2 lg:w-28 md:w-24 w-20 -translate-x-1/2 top-0"
            width={100}
            height={100}
          />
          <h1 className="text-4xl font-extrabold sm:text-6xl">
            Bersama Membangun Ekosistem Agribisnis Berkelanjutan
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-green-100">
            Ekosistem pertanian digital berbasis{" "}
            <b className="text-primary-default">Sacha Inchi</b> yang
            mempertemukan petani, pemodal, pemilik lahan, pembibit, trainer, dan
            konsumen dalam satu aplikasi.
          </p>
          <div className="mt-8 flex md:flex-row flex-col gap-4">
            <Button
              href={authRoute.register}
              variant="warning"
              size="2xl"
              className="text-warning-darker font-semibold hover:text-warning-200 transition-all duration-200"
            >
              Gabung Sekarang
            </Button>
            <Button
              href="#fitur"
              variant="warningOutline"
              size="2xl"
              className="text-white font-semibold border-white hover:text-warning-darker transition-all duration-200"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>
      {/* VALUE PROPOSITION */}{" "}
      <section id="fitur" className="mx-auto max-w-6xl px-6 py-20">
        {" "}
        <h2 className="mb-12 text-center text-3xl font-bold text-green-700">
          {" "}
          Kenapa Memilih SOPO?{" "}
        </h2>{" "}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {" "}
          {[
            {
              title: "Petani",
              desc: "Akses modal, lahan, pendampingan digital, dan sertifikasi petani.",
            },
            {
              title: "Pemilik Lahan",
              desc: "Optimalisasi lahan nganggur dengan kolaborasi bersama petani.",
            },
            {
              title: "Pemodal",
              desc: "Investasi transparan, terukur, dengan ID pohon, usia, dan lokasi.",
            },
            {
              title: "Konsumen",
              desc: "Produk sehat, berkualitas, dengan jejak asal produk yang jelas.",
            },
            {
              title: "Pembibit",
              desc: "Distribusi bibit berkualitas dengan dukungan marketplace SOPO.",
            },
            {
              title: "Trainer",
              desc: "Fasilitator TOT untuk meningkatkan keterampilan petani.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg"
            >
              {" "}
              <h3 className="text-xl font-semibold text-green-700">
                {" "}
                {item.title}{" "}
              </h3>{" "}
              <p className="mt-2 text-gray-600">{item.desc}</p>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </section>{" "}
      {/* FEATURES */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-green-700">
            Fitur Utama
          </h2>

          <div className="grid gap-12 md:grid-cols-2 items-center">
            {/* LEFT: FEATURES LIST */}
            <div className="space-y-6">
              {[
                {
                  title: "Marketplace Produk",
                  desc: "Jual beli hasil panen & produk turunan sacha inchi secara transparan.",
                },
                {
                  title: "Carbon Credit",
                  desc: "Hitung dan jual kredit karbon dari pohon yang ditanam.",
                },
                {
                  title: "Manajemen Lahan",
                  desc: "Cari dan kelola lahan kosong terdekat yang bisa digarap.",
                },
                {
                  title: "Training Digital",
                  desc: "Akses materi TOT, video pelatihan, dan sertifikasi petani.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-6 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-green-700">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Image
                src={ImAppIphone}
                priority
                alt="sopo app iphone"
                className="w-[280px] md:w-[320px] drop-shadow-2xl rounded-2xl"
                height={320}
                width={280}
              />
            </div>
          </div>
        </div>
      </section>
      {/* CTA SECTION */}{" "}
      <section
        id="daftar"
        className="relative flex flex-col items-center justify-center bg-green-700 px-6 py-20 text-center text-white"
      >
        {" "}
        <h2 className="text-3xl font-bold sm:text-4xl">
          {" "}
          Siap Menjadi Bagian dari Revolusi Hijau?{" "}
        </h2>{" "}
        <p className="mt-4 max-w-2xl text-green-100">
          {" "}
          Daftar sekarang untuk mendapatkan akses awal ke platform SOPO dan ikut
          membangun ekosistem pertanian berkelanjutan berbasis sacha inchi.{" "}
        </p>{" "}
        <Link
          href={authRoute.register}
          className="mt-8 rounded-md bg-yellow-400 px-8 py-3 text-lg font-semibold text-black shadow-md hover:bg-yellow-500"
        >
          {" "}
          Daftar Sekarang{" "}
        </Link>{" "}
      </section>{" "}
      {/* FOOTER */}{" "}
      <footer className="bg-gray-900 px-6 py-10 text-center text-gray-400">
        {" "}
        <p>
          {" "}
          © {new Date().getFullYear()} SOPO. Ekosistem Pertanian Digital
          Berkelanjutan.{" "}
        </p>{" "}
      </footer>
    </main>
  );
};
