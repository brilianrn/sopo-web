"use client";

import { Image } from "@/components/atoms";
import { DialogDrawer } from "@/components/molecules";
import { useEffect, useState } from "react";
import { OgImage } from "../../../../public/assets/images";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export const InstallPwaModal = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      const event = e as BeforeInstallPromptEvent;
      const alreadyInstalled = localStorage.getItem("pwa-installed");
      if (!alreadyInstalled) {
        setDeferredPrompt(event);
        setOpen(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem("pwa-installed", "true");
      console.log("✅ User accepted install");
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
