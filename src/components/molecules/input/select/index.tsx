'use client';

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  Select as SelectOriginal,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms';
import styles from '@/shared/styles/components/input.module.css';
import { cn } from '@/shared/utils';
import { ChevronDown } from 'lucide-react';
import { FC, useEffect, useMemo, useState } from 'react';
import { InputSelelctProps } from '../input';

export const InputSelect: FC<InputSelelctProps> = ({
  className,
  size = 'lg',
  disabled,
  useLabelInside,
  errorMessage,
  placeholder,
  label,
  name,
  options,
  register,
  setValue,
  value,
  required,
}) => {
  const [inputState, setInputState] = useState<string>();
  const [opened, setOpened] = useState<boolean>(false);

  const tuningRegister = useMemo(() => register && name && register(name), [register, name]);

  useEffect(() => {
    if (tuningRegister && value) {
      setInputState(value);
    }
  }, [tuningRegister, value]);

  const onChange = (e: string) => {
    if (tuningRegister) {
      tuningRegister?.onChange({
        target: { value: e },
      });
    } else {
      if (setValue) setValue(e);
    }
    setInputState(e);
  };

  const labelValue = useMemo(
    () => options?.find((e) => e.value === inputState)?.label,
    [inputState, options],
  );

  return (
    <SelectOriginal onOpenChange={setOpened} onValueChange={onChange}>
      <SelectTrigger
        icon={
          <ChevronDown
            className={cn(
              'transition-all duration-200',
              opened ? 'rotate-180' : '',
              size === 'lg' ? 'size-6' : size === 'md' ? 'size-5' : 'size-4',
            )}
          />
        }
        className={cn(
          styles[size],
          className,
          disabled
            ? 'cursor-not-allowed !bg-gray-100 !border-gray-200'
            : '!bg-white text-black focus:border-primary-default border-gray-300',
          useLabelInside && styles[`form-input-inside${inputState ? '-active' : ''}`],
          errorMessage ? styles['form-input-error'] : styles['form-input'],
          opened && 'input-focused',
        )}
      >
        <SelectValue
          placeholder={
            label &&
            useLabelInside && (
              <label
                className={cn(
                  'transition-all duration-200',
                  styles[`form-label-inside${inputState || value || opened ? '-active' : ''}`],
                  opened || value || inputState ? 'text-gray-500' : 'text-gray-400',
                )}
              >
                <span>{label || placeholder}</span>
                {required && (opened || value || inputState) && (
                  <span className="text-danger-500">*</span>
                )}
              </label>
            )
          }
        >
          {label && useLabelInside && (
            <label
              className={cn(
                'transition-all duration-200',
                styles[`form-label-inside${inputState || value || opened ? '-active' : ''}`],
                opened || value || inputState ? 'text-gray-500' : 'text-gray-400',
              )}
            >
              <span>{label}</span>
              {required && (opened || value || inputState) && (
                <span className="text-danger-500">*</span>
              )}
            </label>
          )}
          {inputState && <p>{labelValue}</p>}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              isActive={option.value === inputState}
              className={styles[size]}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectOriginal>
  );
};
