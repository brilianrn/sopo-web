'use client';

import { Button, OTP, OTPGroup, OTPSlot } from '@/components/atoms';
import { LoadingOverlay } from '@/components/molecules';
import { Layout, TopNavigation } from '@/components/templates';
import { authRoute, Routes, validationMessage } from '@/shared/constants';
import styles from '@/shared/styles/packages/login.module.css';
import { cn, decrypt } from '@/shared/utils';
import { Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { IcSms, IcWhatsapp } from '../../../../../../public/assets/icons';
import { IOtpInfo } from '../../domain/response';
import { useAuthController } from '../controller';

export const LoginVerificationView = () => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>();
  const [countdown, setCountdown] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params = useParams();
  const token = params?.token?.toString();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const { replace } = useRouter();

  const {
    login: { mutate: onResed, isPending: isLoadingResend, variables },
  } = useAuthController();

  const otpInfo = useMemo(() => decrypt<IOtpInfo>(token || ''), [token]);

  useEffect(() => {
    if (!otpInfo?.expiredAt) return;

    const expiredAt = new Date(otpInfo.expiredAt).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, Math.round((expiredAt - now) / 1000));
      setCountdown(diff);
      if (!showContent) setShowContent(true);

      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [otpInfo?.expiredAt, showContent, setShowContent]);

  const onSubmit = async (otpData: string) => {
    setIsLoading(true);
    const res = await signIn('credentials', {
      otp: otpData,
      token: token || '',
      purpose: 'LOGIN',
      redirect: false,
      callbackUrl: callbackUrl?.toString(),
    });
    if (res?.error || !res) {
      window.location.reload();
      return toast.error(validationMessage('OTP').invalidField());
    }

    replace(callbackUrl || Routes.APPS);
    setIsLoading(false);
  };

  return (
    <Layout className="flex flex-col gap-3 items-center">
      <LoadingOverlay visible={isLoading} />
      <TopNavigation title="Konfirmasi Masuk" titlePosition="center" backHref={authRoute.login} />
      <div
        className={cn(
          styles['register-verify-illustration'],
          otpInfo?.email ? styles['email-illustration'] : styles['whatsapp-illustration'],
        )}
      />
      <h1 className="text-lg font-bold text-center">Masukkan Kode Konfirmasi</h1>
      <div className="space-y-0 text-center">
        <p className="text-sm">Kode verifikasi telah dikirimkan melalui email</p>
        <b className="text-md text-primary-default">{otpInfo?.email || otpInfo?.phone || '-'}</b>
      </div>
      <OTP maxLength={4} value={otp} onChange={setOtp} onComplete={onSubmit}>
        <OTPGroup className="space-x-4 mt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <OTPSlot key={index} index={index} className="rounded-md border-l" />
          ))}
        </OTPGroup>
      </OTP>
      {showContent && (
        <>
          <div className="text-sm font-normal mt-4 text-center">
            {!countdown ? (
              <p>Tidak menerima kode verifikasi?</p>
            ) : (
              <p>
                Mohon tunggu{' '}
                <span className="font-bold text-primary-default">{countdown} detik</span> untuk
                kirim ulang
              </p>
            )}
          </div>
          {!countdown ? (
            <div className="space-y-4 mt-7 text-center pb-8">
              <p className="text-xs">Kirim ulang kode verifikasi melalui</p>
              <div className="space-y-3 w-full">
                {otpInfo?.phone && (
                  <Button
                    disabled={isLoadingResend}
                    isSubmitting={isLoadingResend && variables?.input === otpInfo?.phone}
                    onClick={() => onResed({ input: otpInfo?.phone || '', token, password: '' })}
                    className="relative w-full"
                    variant="primaryOutline"
                    size="xl"
                  >
                    <IcWhatsapp className="size-6" />
                    Whatsapp ke {otpInfo?.phone || '-'}
                  </Button>
                )}
                {otpInfo?.email && (
                  <Button
                    disabled={isLoadingResend}
                    isSubmitting={isLoadingResend && variables?.input === otpInfo?.email}
                    onClick={() => onResed({ input: otpInfo?.email || '', token, password: '' })}
                    className="relative w-full"
                    variant="primaryOutline"
                    size="xl"
                  >
                    <Mail className="size-6 text-primary-default" />
                    Email ke {otpInfo?.email || '-'}
                  </Button>
                )}
                {otpInfo?.phone && (
                  <Button
                    disabled={isLoadingResend}
                    isSubmitting={isLoadingResend && variables?.input === otpInfo?.phone}
                    onClick={() => onResed({ input: otpInfo?.phone || '', token, password: '' })}
                    className="relative w-full"
                    variant="primaryOutline"
                    size="xl"
                  >
                    <IcSms className="size-6" />
                    SMS ke {otpInfo?.phone || '-'}
                  </Button>
                )}
              </div>
            </div>
          ) : undefined}
        </>
      )}
    </Layout>
  );
};
