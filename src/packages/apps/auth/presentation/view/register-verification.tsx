"use client";

import { Layout, TopNavigation } from "@/components/templates";
import { authRoute } from "@/shared/constants";
import loginStyles from "@/shared/styles/packages/login.module.css";
import Link from "next/link";
import { useState } from "react";

export const RegisterVerificationView = () => {
  const [resend, setResend] = useState<boolean>(true);

  return (
    <Layout className="flex flex-col gap-3 items-center">
      <TopNavigation
        title="Daftar"
        titlePosition="left"
        backHref={authRoute.register}
        rightContent={
          <Link
            href={authRoute.login}
            className="text-primary-default font-semibold text-md hover:text-primary-600"
          >
            Masuk
          </Link>
        }
      />
      <div className={loginStyles["email-illustration"]} />
      <h1 className="text-lg font-bold text-center">Verifikasi Email Anda</h1>
      <div className="space-y-0 text-center">
        <p className="text-sm">Buka link yang telah dikirimkan ke</p>
        <b className="text-md text-primary-default">john.doe@sopo.com</b>
        <div className="text-sm font-normal mt-20 text-center">
          {!resend ? (
            <p>Tidak menerima kode verifikasi?</p>
          ) : (
            <p>
              Kirim setelah{" "}
              <span className="font-bold text-primary-default">72 detik</span>
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};
