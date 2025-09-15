import { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";

export interface InputProps {
  value?: string;
  setValue?: (data: string) => void;
  register?: UseFormRegister<any>; // eslint-disable-line
  name?: string;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  className?: string;
  errorMessage?: string;
  isSubmitted?: boolean;
  isSubmitSuccessful?: boolean;
  isSubmitting?: boolean;
  isValidating?: boolean;
  isValid?: boolean;
  disabled?: boolean;
}

export interface IInputTextType {
  type:
    | "text"
    | "number"
    | "password"
    | "email"
    | "price"
    | "bank-account-number";
}

export interface InputTextProps extends IInputTextType {
  value?: string;
  setValue?: (data: string) => void;
  name?: string;
  label?: string;
  placeholder?: string;
  labelClassName?: string;
  required?: boolean;
  iconOnClick?: () => void;
  icon?: string | ReactNode;
  iconPosition?: "right" | "left";
  iconType?: "string" | "image";
  iconClassName?: string;
  iconHeight?: number;
  iconWidth?: number;
  className?: string;
  register?: UseFormRegister<any>; // eslint-disable-line
  errorMessage?: string;
  isSubmitted?: boolean;
  isSubmitSuccessful?: boolean;
  isSubmitting?: boolean;
  isValidating?: boolean;
  isValid?: boolean;
  disabled?: boolean;
  useLabelInside?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onEnter?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}

export interface InputTextareaProps
  extends InputTextProps,
    Partial<IInputTextType> {
  type?: "textarea";
  maxLength?: number;
  placeholder?: string;
  useLabelInside?: boolean;
  onEnter?: (value?: string) => void;
}

export interface InputTextSearchProps {
  useLabelInside?: boolean;
  search: string;
  setSearch: (value: string, isChooseItem?: boolean) => void;
  placeholder?: string;
  className?: string;
  delayDebounce?: number;
  useSuggestion?: boolean;
  suggestionEmptyState?: ReactNode | string;
  children?: ReactNode;
  loadingSuggestion?: boolean;
  onEnter?: (value?: string) => void;
  autoHideAfterClickItem?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}
