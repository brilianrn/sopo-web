'use client';

import { Button } from '@/components/atoms';
import { InputText } from '@/components/molecules';
import { Layout, TopNavigation } from '@/components/templates';
import { authRoute } from '@/shared/constants';
import styles from '@/shared/styles/packages/login.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { TFirstFormRegisterSchema } from '../../domain/request';
import { FirstFormRegisterSchema } from '../../dto';
import { useAuthController } from '../controller';

export const RegisterView = () => {
  const {
    register,
    getFieldState,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TFirstFormRegisterSchema>({
    mode: 'onChange',
    resolver: zodResolver(FirstFormRegisterSchema),
  });

  const {
    register: { mutate, isPending: isLoading },
  } = useAuthController();

  return (
    <Layout>
      <TopNavigation
        title="Daftar"
        titlePosition="left"
        backHref={authRoute.login}
        rightContent={
          <Link
            href={authRoute.login}
            className="text-primary-default font-semibold text-md hover:text-primary-600"
          >
            Masuk
          </Link>
        }
      />
      <div className={styles.login}>
        <form className="space-y-3 w-full" onSubmit={handleSubmit((data) => mutate(data))}>
          <InputText
            size="lg"
            type="email"
            useLabelInside
            label="Masukkan Email atau No HP"
            name="input"
            register={register}
            errorMessage={errors.input?.message || ''}
          />
          <Button
            variant="primary"
            size="xl"
            isSubmitting={isSubmitting || isLoading}
            type="submit"
            disabled={!getFieldState('input')?.invalid && watch('input') ? false : !isValid}
          >
            Selanjutnya
          </Button>
          <div className={styles.or}>
            <div className={styles['or-text']}>Atau menggunakan</div>
            <hr className={styles['or-line']} />
          </div>
          <Button size="lg" className="!bg-white !text-black !border-gray-300 relative">
            <div className={styles.google} />
            Daftar dengan Google
          </Button>
          {/* TODO: Must be available for Register with Apple <Button size="lg" className="!text-white !bg-black !border-black relative">
            <div className={styles.apple} />
            Daftar dengan Apple
          </Button> */}
        </form>
        <div className="text-center mt-20">
          <p className="text-sm ">
            Sudah memiliki akun?{' '}
            <Link
              href={authRoute.login}
              className="text-primary-default font-semibold hover:text-primary-600"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};
