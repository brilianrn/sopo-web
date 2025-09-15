"use client";

import { Spinner } from "@/components/atoms";
import classNames from "clsx";
import { Search, X } from "lucide-react";
import { FC, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { InputTextSearchProps } from "../input";
import { InputText } from "../text";

const InputTextSearch: FC<InputTextSearchProps> = ({
  search,
  setSearch,
  placeholder,
  className,
  useLabelInside,
  delayDebounce,
  useSuggestion,
  loadingSuggestion,
  onEnter,
  children,
  suggestionEmptyState,
  autoHideAfterClickItem = true,
  size = "md",
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [isShowSuggestion, setIsShowSuggestion] = useState<boolean>(false);

  const debounce = useDebouncedCallback(
    (value) => setSearch(value),
    delayDebounce
  );

  const onChangeText = (value: string) => {
    setKeyword(value);
    if (typeof value === "string" && value) {
      debounce(value);
    } else {
      setSearch("", true);
    }
  };

  return (
    <div className={classNames(["group relative w-full"])}>
      <InputText
        useLabelInside={useLabelInside}
        label={useLabelInside ? placeholder : ""}
        type="text"
        icon={
          (delayDebounce ? !keyword : !search) ? (
            <Search className="size-5 text-gray-500" />
          ) : (
            <X className="size-5 text-gray-500" />
          )
        }
        iconOnClick={() => {
          setSearch("");
          setKeyword("");
        }}
        iconClassName="cursor-pointer"
        iconHeight={20}
        iconWidth={20}
        iconType="string"
        iconPosition="right"
        size={size}
        placeholder={placeholder}
        className={classNames([
          delayDebounce ? keyword : search && "!border-primary-default",
          "w-full",
          className,
        ])}
        value={delayDebounce ? keyword : search}
        setValue={delayDebounce ? onChangeText : setSearch}
        onFocus={() => setIsShowSuggestion(true)}
        onBlur={() =>
          setTimeout(
            () => autoHideAfterClickItem && setIsShowSuggestion(false),
            200
          )
        }
        onEnter={() => {
          if (onEnter) {
            onEnter(delayDebounce ? keyword : search);
          }
          setIsShowSuggestion(false);
        }}
      />
      {useSuggestion && isShowSuggestion && (
        <div className="z-1 absolute w-full rounded-md mt-2 bg-white shadow-[0px_0px_4px_0px_rgba(87,87,87,0.24)]">
          {loadingSuggestion ? (
            <Spinner />
          ) : children ? (
            children
          ) : (
            <p className="my-10 w-full text-center text-sm italic text-gray-400">
              {suggestionEmptyState || "-- Produk tidak ditemukan --"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputTextSearch;
