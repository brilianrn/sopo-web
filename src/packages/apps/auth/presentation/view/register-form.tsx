'use client';

import { Button } from '@/components/atoms';
import { Checkbox, InputText, LoadingOverlay } from '@/components/molecules';
import { VerifyConfirmPassword } from '@/components/organisms';
import { Layout, TopNavigation } from '@/components/templates';
import { helpCenterRoute, validationMessage } from '@/shared/constants';
import loginStyles from '@/shared/styles/packages/login.module.css';
import { decrypt } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TFormRegisterSchema } from '../../domain/request';
import { IOtpInfo } from '../../domain/response';
import { FormRegisterSchema } from '../../dto';
import { EAuthQuery, useAuthController } from '../controller';

export const RegisterFormView = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const params = useParams();
  const token = params?.token?.toString();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TFormRegisterSchema>({
    mode: 'onChange',
    resolver: zodResolver(FormRegisterSchema),
  });

  const {
    lovRole: { data: lovRole },
    registerFull: { mutate: registerFull, isPending: isLoadingRegisterFull },
  } = useAuthController(EAuthQuery.LOV_ROLE);

  const verifyInfo = useMemo(() => decrypt<IOtpInfo>(token || ''), [token]);

  const confirmPasswordVerify = useMemo(() => {
    const passwordConfirmation = watch('passwordConfirmation');
    const password = watch('password');
    return [
      {
        isValid: passwordConfirmation?.length >= 8 && password?.length >= 8,
        label: 'Minimal 8 Karakter',
      },
      {
        isValid: /[A-Z]/.test(passwordConfirmation) && /[A-Z]/.test(password),
        label: 'Mengandung Huruf Besar',
      },
      {
        isValid: /[0-9]/.test(passwordConfirmation) && /[0-9]/.test(password),
        label: 'Mengandung 1 Angka',
      },
      {
        isValid: /[!@#$%^&*]/.test(passwordConfirmation) && /[!@#$%^&*]/.test(password),
        label: 'Mengandung 1 Karakter Spesial atau Simbol',
      },
    ];
    // eslint-disable-next-line
  }, [watch('passwordConfirmation'), watch('password')]);

  useEffect(() => {
    if (verifyInfo) {
      setValue('input', verifyInfo.email || verifyInfo.phone || '');
      setValue('roleCode', process.env.CUSTOMER_CODE || '', {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [verifyInfo, setValue]);

  const checkSamePasswordMessage = useMemo(() => {
    const password = watch('password');
    const passwordConfirmation = watch('passwordConfirmation');
    return (
      password !== passwordConfirmation &&
      watch('passwordConfirmation') &&
      validationMessage('Konfirmasi kata sandi').notSame('kata sandi')
    );
    // eslint-disable-next-line
  }, [watch('password'), watch('passwordConfirmation')]);

  return (
    <Layout>
      <LoadingOverlay visible={isLoadingRegisterFull} />
      <TopNavigation
        title={`Daftar dengan ${verifyInfo?.email ? 'Email' : 'Nomor Telepon'}`}
        titlePosition="center"
      />
      <form
        className="p-5 space-y-5 items-center"
        onSubmit={handleSubmit((data) => registerFull({ ...data, token }))}
      >
        <InputText
          size="lg"
          type="email"
          useLabelInside
          label={verifyInfo?.email ? 'Email' : 'Nomor Telepon'}
          disabled
          value={watch('input')}
          errorMessage={errors.input?.message}
        />
        <InputText
          size="lg"
          type="text"
          useLabelInside
          label="Nama Lengkap"
          name="name"
          register={register}
          errorMessage={errors.name?.message}
        />
        <InputText
          size="lg"
          type={showPassword ? 'text' : 'password'}
          useLabelInside
          label="Kata Sandi"
          iconType="string"
          icon={
            showPassword ? (
              <Eye className={loginStyles.eye} onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <EyeOff className={loginStyles.eye} onClick={() => setShowPassword(!showPassword)} />
            )
          }
          iconPosition="right"
          name="password"
          register={register}
          errorMessage={errors.password?.message}
        />
        <div className="space-y-3">
          <InputText
            size="lg"
            type={showConfirmPassword ? 'text' : 'password'}
            useLabelInside
            label="Konfirmasi Kata Sandi"
            iconType="string"
            icon={
              showConfirmPassword ? (
                <Eye
                  className={loginStyles.eye}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <EyeOff
                  className={loginStyles.eye}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )
            }
            iconPosition="right"
            name="passwordConfirmation"
            register={register}
            errorMessage={errors.passwordConfirmation?.message || checkSamePasswordMessage || ''}
          />
          {confirmPasswordVerify.map((item, index) => (
            <VerifyConfirmPassword label={item?.label} isValid={item?.isValid} key={index} />
          ))}
        </div>
        <Checkbox
          id={process.env.FARMER_CODE || ''}
          setChecked={(e) => {
            if (e) setValue('roleCode', process.env.FARMER_CODE || '');
            else setValue('roleCode', process.env.CUSTOMER_CODE || '');
          }}
          checked={
            watch('roleCode') === lovRole?.find((e) => e?.value === process.env.FARMER_CODE)?.value
          }
        >
          <span className="text-sm text-gray-500 cursor-pointer hover:text-primary-darker">
            Saya adalah petani
          </span>
        </Checkbox>
        <div className="space-y-3 text-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-5"
            disabled={!isValid || isSubmitting}
            isSubmitting={isSubmitting}
          >
            Daftar
          </Button>
          <div className="text-xs">
            Dengan mendaftar, saya menyetujui
            <br />
            <Link className="text-primary-default" href={helpCenterRoute.tnc}>
              Syarat dan Ketentuan
            </Link>{' '}
            serta{' '}
            <Link className="text-primary-default" href={helpCenterRoute.privacyPolicy}>
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </form>
    </Layout>
  );
};
