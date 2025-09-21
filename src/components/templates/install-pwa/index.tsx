"use client";

import { Image } from "@/components/atoms";
import { DialogDrawer } from "@/components/molecules";
import { useEffect, useState } from "react";
import { OgImage } from "../../../../public/assets/images";

export const InstallPwaModal = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e?.preventDefault();
      const alreadyInstalled = localStorage.getItem("pwa-installed");
      if (!alreadyInstalled) {
        setDeferredPrompt(e);
        setOpen(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("✅ User accepted install");
      localStorage.setItem("pwa-installed", "true");
    } else {
      console.log("❌ User dismissed install");
    }
    setDeferredPrompt(null);
    setOpen(false);
  };

  return (
    <DialogDrawer
      open={open}
      setOpen={setOpen}
      title="Install SOPO"
      cancelButton="Nanti Saja"
      submitButton="Install Sekarang"
      onCancel={() => setOpen(false)}
      onSubmit={handleInstall}
      disabledSubmitButton={false}
    >
      <div className="pb-6 md:pt-4 pt-4 text-center space-y-4">
        <Image
          src={OgImage}
          alt="sopo logo"
          height={100}
          width={100}
          className="rounded-2xl mx-auto"
        />
        <p>
          Pasang aplikasi SOPO di perangkat Anda untuk pengalaman lebih baik.
        </p>
      </div>
    </DialogDrawer>
  );
};
