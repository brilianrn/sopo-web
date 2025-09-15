"use client";

import styles from "@/shared/styles/components/input.module.css";
import { cn, formatRupiah, isNumber, unformatRupiah } from "@/shared/utils";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { InputTextProps } from "../input";

export const InputText = ({
  type,
  className,
  icon,
  iconClassName,
  iconOnClick,
  iconPosition,
  register,
  label,
  required,
  labelClassName,
  errorMessage,
  placeholder,
  name,
  value,
  setValue,
  disabled = false,
  iconType = "image",
  iconHeight = 50,
  iconWidth = 50,
  useLabelInside = false,
  onBlur,
  onFocus,
  onEnter,
  size = "lg",
}: InputTextProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputState, setInputState] = useState<string>();

  useEffect(() => {
    if (value && !inputState) {
      onChange({ target: { value } } as ChangeEvent<HTMLInputElement>);
    }
    // eslint-disable-next-line
  }, [value, inputState]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tempValue = e.target.value;
    if (type === "price") {
      const nonIDR = unformatRupiah(tempValue);
      if (isNumber(nonIDR)) {
        const IDR = formatRupiah(Number(nonIDR || "0"), ".");
        setInputState(IDR);
        return setValue && setValue(nonIDR);
      }
      setInputState(
        tempValue === "" || tempValue.length < 4 ? "" : (value as string)
      );
      return (
        setValue &&
        setValue(
          tempValue === "" || tempValue.length < 4 ? "" : (value as string)
        )
      );
    } else if (type === "bank-account-number") {
      if (isNumber(tempValue)) {
        return setValue && setValue(tempValue);
      }
      return setValue && setValue(tempValue === "" ? "" : (value as string));
    }
    return setValue && setValue(tempValue);
  };

  return (
    <div
      className={cn(
        labelClassName,
        "relative w-full",
        label && !useLabelInside && "flex flex-col gap-2"
      )}
    >
      {label && !useLabelInside && (
        <label
          className={cn(
            useLabelInside &&
              styles[`form-label-inside${value ? "-active" : ""}`],
            useLabelInside && "text-primary-default dark:text-white"
          )}
        >
          {label}
          {required && <span className="text-danger-500">*</span>}
        </label>
      )}
      <span className="relative block">
        {register && name ? (
          <input
            {...register(name, {
              onChange: (e) => {
                setInputState(e?.target?.value);
                return e;
              },
              valueAsNumber: type === "number",
            })}
            onBlur={() => {
              setIsFocused(false);
              if (onBlur) onBlur();
            }}
            onFocus={() => {
              setIsFocused(true);
              if (onFocus) onFocus();
            }}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === "enter") {
                e.preventDefault();
                if (onEnter) onEnter();
              }
            }}
            type={type === "price" ? "text" : type}
            placeholder={useLabelInside ? "" : placeholder}
            disabled={disabled}
            className={cn(
              styles[size],
              className,
              disabled
                ? "cursor-not-allowed !bg-gray-100"
                : "!bg-white dark:!bg-dark-default text-black dark:text-white focus:border-primary-default border-gray-300 dark:focus:border-primary-lighter",
              useLabelInside &&
                styles[`form-input-inside${inputState ? "-active" : ""}`],
              errorMessage
                ? styles[
                    `form-input${
                      icon && iconPosition ? `-with-icon-${iconPosition}` : ""
                    }-error`
                  ]
                : styles[
                    `form-input${
                      icon && iconPosition ? `-with-icon-${iconPosition}` : ""
                    }`
                  ],
              isFocused && "input-focused"
            )}
          />
        ) : (
          <input
            onBlur={() => {
              setIsFocused(false);
              if (onBlur) onBlur();
            }}
            onFocus={() => {
              setIsFocused(true);
              if (onFocus) onFocus();
            }}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === "enter") {
                e.preventDefault();
                if (onEnter) onEnter();
              }
            }}
            type={type === "price" ? "text" : type}
            value={inputState || value || ""}
            onChange={onChange}
            placeholder={useLabelInside ? "" : placeholder}
            disabled={disabled}
            className={cn(
              styles[size],
              className,
              disabled
                ? "cursor-not-allowed bg-gray-100"
                : "!bg-white dark:!bg-dark-default text-black dark:text-white focus:border-primary-default border-gray-300 dark:focus:border-primary-lighter",
              useLabelInside &&
                styles[`form-input-inside${value ? "-active" : ""}`],
              errorMessage
                ? styles[
                    `form-input${
                      icon && iconPosition ? `-with-icon-${iconPosition}` : ""
                    }-error`
                  ]
                : styles[
                    `form-input${
                      icon && iconPosition ? `-with-icon-${iconPosition}` : ""
                    }`
                  ],
              isFocused && "input-focused"
            )}
          />
        )}
        {label && useLabelInside && (
          <label
            className={cn(
              styles[
                `form-label-inside${inputState || value ? "-active" : ""}`
              ],
              isFocused || value || inputState
                ? "text-primary-default dark:text-white"
                : "text-gray-400"
            )}
          >
            <span>{label}</span>
            {required && (isFocused || value || inputState) && (
              <span className="text-danger-500">*</span>
            )}
          </label>
        )}
        {icon &&
          iconPosition &&
          iconType === "image" &&
          typeof icon === "string" && (
            <span
              className={cn(
                "absolute top-[50%] translate-y-[-50%]",
                iconPosition === "right" ? "right-4" : "left-4",
                disabled ? "!cursor-not-allowed" : ""
              )}
            >
              <Image
                alt={`input-${name}`}
                src={icon}
                className={`${iconClassName} ${
                  disabled ? "!cursor-not-allowed" : ""
                }`}
                onClick={iconOnClick}
                height={iconHeight}
                width={iconWidth}
              />
            </span>
          )}
        {icon && iconPosition && iconType === "string" && (
          <span
            className={cn(
              iconClassName,
              "absolute top-[50%] translate-y-[-50%]",
              iconPosition === "right" ? "right-4" : "left-4",
              disabled ? "!cursor-not-allowed" : ""
            )}
            onClick={iconOnClick}
          >
            {icon}
          </span>
        )}
      </span>
      {errorMessage && (
        <p className="text-danger-500 font-medium text-sm pl-4">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
