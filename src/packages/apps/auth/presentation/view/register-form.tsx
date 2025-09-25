"use client";

import { Button } from "@/components/atoms";
import { InputSelect, InputText } from "@/components/molecules";
import { VerifyConfirmPassword } from "@/components/organisms";
import { Layout, TopNavigation } from "@/components/templates";
import { helpCenterRoute, validationMessage } from "@/shared/constants";
import { FormRegisterSchema } from "@/shared/schemas/register.schema";
import loginStyles from "@/shared/styles/packages/login.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { EUserType, TFormRegisterSchema } from "../../domain/request";

export const RegisterFormView = () => {
  const userTypeLabels: Record<EUserType, string> = {
    [EUserType.CUSTOMER]: "Pembeli",
    [EUserType.FARMER]: "Petani",
    [EUserType.BREEDER]: "Peternak",
    [EUserType.LAND_OWNER]: "Pemilik Lahan",
    [EUserType.INVESTOR]: "Investor",
    [EUserType.TRAINER_OF_TRAINER]: "Trainer of Trainer",
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TFormRegisterSchema>({
    mode: "onChange",
    resolver: zodResolver(FormRegisterSchema),
  });

  const confirmPasswordVerify = useMemo(() => {
    const passwordConfirmation = watch("passwordConfirmation");
    const password = watch("password");
    return [
      {
        isValid: passwordConfirmation?.length >= 8 && password?.length >= 8,
        label: "Minimal 8 Karakter",
      },
      {
        isValid: /[A-Z]/.test(passwordConfirmation) && /[A-Z]/.test(password),
        label: "Mengandung Huruf Besar",
      },
      {
        isValid: /[0-9]/.test(passwordConfirmation) && /[0-9]/.test(password),
        label: "Mengandung 1 Angka",
      },
      {
        isValid:
          /[!@#$%^&*]/.test(passwordConfirmation) &&
          /[!@#$%^&*]/.test(password),
        label: "Mengandung 1 Karakter Spesial atau Simbol",
      },
    ];
  }, [watch("passwordConfirmation"), watch("password")]);

  const checkSamePasswordMessage = useMemo(() => {
    const password = watch("password");
    const passwordConfirmation = watch("passwordConfirmation");
    return (
      password !== passwordConfirmation &&
      watch("passwordConfirmation") &&
      validationMessage("Konfirmasi kata sandi").notSame("kata sandi")
    );
  }, [watch("password"), watch("passwordConfirmation")]);

  return (
    <Layout>
      <TopNavigation title="Daftar dengan Email" titlePosition="center" />
      <form className="p-5 space-y-5 items-center">
        <InputText
          size="lg"
          type="email"
          useLabelInside
          label="Email atau No HP"
          name="input"
          disabled
          register={register}
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
        <InputSelect
          useLabelInside
          label="Tipe Pengguna"
          name="userType"
          register={register}
          options={Object.values(EUserType).map((value) => ({
            label: userTypeLabels[value],
            value,
          }))}
        />
        <InputText
          size="lg"
          type={showPassword ? "text" : "password"}
          useLabelInside
          label="Kata Sandi"
          iconType="string"
          icon={
            showPassword ? (
              <Eye
                className={loginStyles.eye}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeOff
                className={loginStyles.eye}
                onClick={() => setShowPassword(!showPassword)}
              />
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
            type={showConfirmPassword ? "text" : "password"}
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
            errorMessage={
              errors.passwordConfirmation?.message ||
              checkSamePasswordMessage ||
              ""
            }
          />
          {confirmPasswordVerify.map((item, index) => (
            <VerifyConfirmPassword
              label={item?.label}
              isValid={item?.isValid}
              key={index}
            />
          ))}
        </div>
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
            </Link>{" "}
            serta{" "}
            <Link
              className="text-primary-default"
              href={helpCenterRoute.privacyPolicy}
            >
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </form>
    </Layout>
  );
};
