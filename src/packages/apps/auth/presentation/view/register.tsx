"use client";

import { Button } from "@/components/atoms";
import { InputText } from "@/components/molecules";
import { Layout, TopNavigation } from "@/components/templates";
import { authRoute } from "@/shared/constants";
import { FirstFormRegisterSchema } from "@/shared/schemas/register.schema";
import styles from "@/shared/styles/packages/login.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TFirstFormRegisterSchema } from "../../domain/request";

export const RegisterView = () => {
  const [isNextStep, setIsNextStep] = useState<boolean>(false);

  const {
    register,
    getFieldState,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TFirstFormRegisterSchema>({
    mode: "onChange",
    resolver: zodResolver(FirstFormRegisterSchema),
  });

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
        <form className="space-y-3 w-full">
          <InputText
            size="lg"
            type="email"
            useLabelInside
            label="Masukkan Email atau No HP"
            name="input"
            register={register}
            errorMessage={errors.input?.message || ""}
          />
          <Button
            variant="primary"
            size="xl"
            isSubmitting={isSubmitting}
            type={isNextStep ? "submit" : "button"}
            disabled={
              !getFieldState("input")?.invalid && watch("input") && !isNextStep
                ? false
                : !isValid
            }
            onClick={() => setIsNextStep(true)}
          >
            {!isNextStep ? "Selanjutnya" : "Verifikasi"}
          </Button>
          <div className={styles.or}>
            <div className={styles["or-text"]}>Atau menggunakan</div>
            <hr className={styles["or-line"]} />
          </div>
          <Button
            size="lg"
            className="!bg-white !text-black !border-gray-300 relative"
          >
            <div className={styles.google} />
            Daftar dengan Google
          </Button>
          <Button
            size="lg"
            className="!text-white !bg-black !border-black relative"
          >
            <div className={styles.apple} />
            Daftar dengan Apple
          </Button>
        </form>
        <div className="text-center mt-20">
          <p className="text-sm ">
            Sudah memiliki akun?{" "}
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
