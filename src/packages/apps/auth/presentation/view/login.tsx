'use client';

import { Button } from '@/components/atoms';
import { InputText, LoadingOverlay } from '@/components/molecules';
import { Layout, TopNavigation } from '@/components/templates';
import { authRoute, Routes, validationMessage } from '@/shared/constants';
import styles from '@/shared/styles/packages/login.module.css';
import { isEmail } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, SquarePen } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { TLoginSchema } from '../../domain/request';
import { LoginSchema } from '../../dto';

export const LoginView = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isNextStep, setIsNextStep] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    getFieldState,
    resetField,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TLoginSchema>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });

  const { replace } = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  // const {
  //   login: { mutateAsync, isPending: isLoading },
  // } = useAuthController();

  const changeInput = () => {
    setIsNextStep(false);
    resetField('password');
    resetField('method');
  };

  const onSubmit = async (data: TLoginSchema) => {
    setIsLoading(true);
    const res = await signIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: callbackUrl?.toString(),
    });
    if (res?.error || !res) {
      window.location.reload();
      return toast.error(
        validationMessage().failedLogin(isEmail(data?.input) ? 'Email' : 'Nomor telepon'),
      );
    }

    replace(callbackUrl || Routes.APPS);
    setIsLoading(false);
  };

  return (
    <Layout>
      <LoadingOverlay visible={isLoading} />
      <TopNavigation
        title="Masuk"
        titlePosition="left"
        backHref={Routes.APPS}
        rightContent={
          <Link
            href={authRoute.register}
            className="text-primary-default font-semibold text-md hover:text-primary-600"
          >
            Daftar
          </Link>
        }
      />
      <div className={styles.login}>
        <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            size="lg"
            type="email"
            useLabelInside
            disabled={isNextStep}
            iconType="string"
            iconOnClick={changeInput}
            icon={isNextStep && <SquarePen className="text-primary-default cursor-pointer" />}
            iconPosition="right"
            label={
              isNextStep
                ? isEmail(watch('input'))
                  ? 'Email'
                  : 'Nomor Telepon'
                : 'Masukan Email atau No HP'
            }
            name="input"
            register={register}
            errorMessage={errors.input?.message || ''}
          />
          <div className={!isNextStep ? 'hidden' : 'block'}>
            <InputText
              size="lg"
              type={showPassword ? 'text' : 'password'}
              useLabelInside
              label="Kata Sandi"
              iconType="string"
              icon={
                showPassword ? (
                  <Eye className={styles.eye} onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <EyeOff className={styles.eye} onClick={() => setShowPassword(!showPassword)} />
                )
              }
              iconPosition="right"
              name="password"
              register={register}
              errorMessage={errors.password?.message || ''}
            />
            <div className="flex justify-end items-center mt-2">
              {/* TODO: Must be available to remember me <Checkbox id="remember" setChecked={setIsRemember} checked={isRemember}>
                <span className="text-sm text-gray-500 cursor-pointer hover:text-primary-darker">
                  Ingat Saya
                </span>
              </Checkbox> */}
              <Link href={authRoute.forgotPassword} className={styles['forgot-password']}>
                Lupa Kata Sandi?
              </Link>
            </div>
          </div>
          <Button
            variant="primary"
            size="xl"
            isSubmitting={isSubmitting || isLoading}
            type={isNextStep ? 'submit' : 'button'}
            disabled={
              !getFieldState('input')?.invalid && watch('input') && !isNextStep ? false : !isValid
            }
            onClick={!isNextStep ? () => setIsNextStep(true) : undefined}
          >
            {!isNextStep ? 'Selanjutnya' : 'Verifikasi'}
          </Button>
          <div className={styles.or}>
            <div className={styles['or-text']}>Atau menggunakan</div>
            <hr className={styles['or-line']} />
          </div>
          <Button size="lg" className="!bg-white !text-black !border-gray-300 relative">
            <div className={styles.google} />
            Masuk dengan Google
          </Button>
          {/* TODO: Must be available for Login with Apple <Button size="lg" className="!text-white !bg-black !border-black relative">
            <div className={styles.apple} />
            Masuk dengan Apple
          </Button> */}
        </form>
        <div className="text-center mt-20">
          <p className="text-sm ">
            Belum memiliki akun?{' '}
            <Link
              href={authRoute.register}
              className="text-primary-default font-semibold hover:text-primary-600"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};
