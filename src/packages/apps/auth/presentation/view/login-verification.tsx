"use client";

import { Button, OTP, OTPGroup, OTPSlot } from "@/components/atoms";
import { Layout, TopNavigation } from "@/components/templates";
import { authRoute } from "@/shared/constants";
import styles from "@/shared/styles/packages/login.module.css";
import { Mail } from "lucide-react";
import { useState } from "react";
import { IcSms, IcWhatsapp } from "../../../../../../public/assets/icons";

export const LoginVerificationView = () => {
  const [otp, setOtp] = useState<string>();
  const [resend, setResend] = useState<boolean>(true);

  return (
    <Layout className="flex flex-col gap-3 items-center">
      <TopNavigation
        title="Konfirmasi Masuk"
        titlePosition="center"
        backHref={authRoute.login}
      />
      <div className={styles["email-illustration"]} />
      <h1 className="text-lg font-bold text-center">
        Masukkan Kode Konfirmasi
      </h1>
      <div className="space-y-0 text-center">
        <p className="text-sm">
          Kode verifikasi telah dikirimkan melalui email
        </p>
        <b className="text-md text-primary-default">john.doe@sopo.com</b>
      </div>
      <OTP maxLength={4} value={otp} onChange={setOtp}>
        <OTPGroup className="space-x-4 mt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <OTPSlot
              key={index}
              index={index}
              className="rounded-md border-l"
            />
          ))}
        </OTPGroup>
      </OTP>
      <div className="text-sm font-normal mt-4 text-center">
        {resend ? (
          <p>Tidak menerima kode verifikasi?</p>
        ) : (
          <p>
            Mohon tunggu{" "}
            <span className="font-bold text-primary-default">72 detik</span>{" "}
            untuk kirim ulang
          </p>
        )}
      </div>
      {resend && (
        <div className="space-y-4 mt-7 text-center pb-8">
          <p className="text-xs">Kirim ulang kode verifikasi melalui</p>
          <div className="space-y-3 w-full">
            <Button
              className="relative w-full"
              variant="primaryOutline"
              size="xl"
            >
              <IcWhatsapp className="size-6" />
              Whatsapp ke 081234567890
            </Button>
            <Button
              className="relative w-full"
              variant="primaryOutline"
              size="xl"
            >
              <Mail className="size-6 text-primary-default" />
              Email ke john.doe@sopo.com
            </Button>
            <Button
              className="relative w-full"
              variant="primaryOutline"
              size="xl"
            >
              <IcSms className="size-6" />
              SMS ke 081234567890
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};
