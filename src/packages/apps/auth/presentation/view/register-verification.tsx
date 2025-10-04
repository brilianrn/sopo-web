'use client';

import { LoadingOverlay } from '@/components/molecules';
import { Layout, TopNavigation } from '@/components/templates';
import { authRoute } from '@/shared/constants';
import loginStyles from '@/shared/styles/packages/login.module.css';
import { cn, decrypt } from '@/shared/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ELoginType } from '../../domain/request';
import { IOtpInfo } from '../../domain/response';
import { useAuthController } from '../controller';

export const RegisterVerificationView = () => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  const params = useParams();
  const token = params?.token?.toString();

  const {
    register: { mutate: onResend, isPending: isLoadingResend },
  } = useAuthController();

  const verifyInfo = useMemo(() => decrypt<IOtpInfo>(token || ''), [token]);

  useEffect(() => {
    if (!verifyInfo?.expiredAt) return;

    const expiredAt = new Date(verifyInfo.expiredAt).getTime();

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
  }, [verifyInfo?.expiredAt, showContent]);

  return (
    <Layout className="flex flex-col gap-3 items-center">
      <LoadingOverlay visible={isLoadingResend} />
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
      <div
        className={cn(
          loginStyles['register-verify-illustration'],
          verifyInfo?.email
            ? loginStyles['email-illustration']
            : loginStyles['whatsapp-illustration'],
        )}
      />
      <h1 className="text-lg font-bold text-center">
        Verifikasi {verifyInfo?.email ? 'Email' : 'Whatsapp'} Anda
      </h1>
      <div className="space-y-0 text-center">
        <p className="text-sm">Buka link yang telah dikirimkan ke</p>
        <b className="text-md text-primary-default">{verifyInfo?.email}</b>
        <div className="text-sm font-normal mt-20 text-center">
          {!countdown ? (
            <div className="flex justify-center items-center gap-1">
              <p>Tidak menerima kode verifikasi?</p>
              <button
                className="text-primary-default font-semibold text-sm hover:text-primary-600"
                onClick={() =>
                  onResend({
                    input: (verifyInfo?.email || verifyInfo?.phone)?.toString() || '',
                    method: verifyInfo?.email ? ELoginType.EMAIL : ELoginType.WHATSAPP,
                  })
                }
              >
                Kirim ulang
              </button>
            </div>
          ) : (
            <p>
              Kirim setelah{' '}
              <span className="font-bold text-primary-default">{countdown} detik</span>
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};
