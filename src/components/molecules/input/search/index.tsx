'use client';

import { NotFoundComp, Spinner } from '@/components/atoms';
import classNames from 'clsx';
import { Search, X } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { InputTextSearchProps } from '../input';
import { InputText } from '../text';

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
  size = 'md',
  suggestionLoadingState,
}) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [keyword, setKeyword] = useState<string>();
  const [isShowSuggestion, setIsShowSuggestion] = useState<boolean>(false);

  const [debounceValue] = useDebounce(keyword, !keyword ? 0 : delayDebounce || 1000);

  useEffect(() => setSearch(debounceValue), [debounceValue, setSearch]);

  const onChangeText = (value: string) => {
    setKeyword(value);
  };

  useEffect(() => {
    !delayDebounce && setKeyword('');
  }, [delayDebounce]);

  return (
    <div className={classNames(['group relative w-full'])}>
      <InputText
        inputRef={searchRef}
        useLabelInside={useLabelInside}
        label={useLabelInside ? placeholder : ''}
        type="text"
        icon={
          (delayDebounce ? !keyword : !search) ? (
            <Search className="size-5 text-gray-500" />
          ) : (
            <X className="size-5 text-gray-500" />
          )
        }
        iconOnClick={() => {
          setSearch(undefined);
          setKeyword(undefined);
        }}
        iconClassName="cursor-pointer"
        iconHeight={20}
        iconWidth={20}
        iconType="string"
        iconPosition="right"
        size={size}
        placeholder={placeholder}
        className={classNames([
          delayDebounce ? keyword : search && '!border-primary-default',
          'w-full',
          className,
        ])}
        value={delayDebounce ? keyword : search}
        setValue={delayDebounce ? onChangeText : setSearch}
        onFocus={() => setIsShowSuggestion(true)}
        onBlur={() => setTimeout(() => autoHideAfterClickItem && setIsShowSuggestion(false), 200)}
        onEnter={() => {
          if (onEnter) {
            onEnter(delayDebounce ? keyword : search);
          }
          setIsShowSuggestion(false);
        }}
      />
      {useSuggestion && isShowSuggestion && (
        <div className="z-1 absolute w-full max-h-80 h-fit overflow-y-auto rounded-md mt-2 bg-white box-shadow">
          {loadingSuggestion ? (
            <div className="h-80 w-full flex items-center justify-center">
              <Spinner variant="primary" message={suggestionLoadingState} />
            </div>
          ) : children ? (
            children
          ) : (
            <NotFoundComp label="Data" message={suggestionEmptyState} className="py-10" />
          )}
        </div>
      )}
    </div>
  );
};

export default InputTextSearch;
