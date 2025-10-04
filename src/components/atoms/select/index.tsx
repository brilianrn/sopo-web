'use client';

import { cn } from '@/shared/utils/index';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as React from 'react';

const Select = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) => (
  <SelectPrimitive.Root data-slot="select" {...props} />
);

const SelectGroup = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) => (
  <SelectPrimitive.Group data-slot="select-group" {...props} />
);

const SelectValue = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) => (
  <SelectPrimitive.Value data-slot="select-value" {...props} />
);

const SelectTrigger = ({
  className,
  size = 'default',
  children,
  icon,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default';
  icon: React.ReactNode;
}) => (
  <SelectPrimitive.Trigger
    data-slot="select-trigger"
    data-size={size}
    className={cn(
      // default
      'flex w-full items-center justify-between gap-2 rounded-md border border-gray-400 bg-white px-3 py-2 text-sm text-dark-900 shadow-xs outline-none transition relative',
      // focus
      'focus:border-primary-500 focus:ring-2 focus:ring-primary-200',
      // disabled
      'disabled:cursor-not-allowed disabled:opacity-50',
      // size
      'data-[size=default]:h-9 data-[size=sm]:h-8',
      // value slot
      '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2',
      // icon style
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-gray-500",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild className="absolute top-1/2 -translate-y-1/2 right-4">
      {icon}
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

const SelectContent = ({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      data-slot="select-content"
      className={cn(
        'bg-white text-dark-900 border border-gray-300 rounded-md shadow-md relative z-50 overflow-hidden',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

const SelectLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label
    data-slot="select-label"
    className={cn('px-2 py-1.5 text-xs text-gray-500', className)}
    {...props}
  />
);

const SelectItem = ({
  className,
  children,
  isActive,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & {
  isActive: boolean;
}) => (
  <SelectPrimitive.Item
    data-slot="select-item"
    className={cn(
      isActive && 'bg-primary-50',
      'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm text-dark-900 outline-none',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'hover:bg-primary-50 hover:text-primary-700 focus:bg-primary-lighter/50 focus:text-black',
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-gray-500",
      className,
    )}
    {...props}
  >
    {isActive && (
      <span className="absolute left-0 flex items-center justify-center h-full w-1 bg-primary-default">
        {' '}
      </span>
    )}
    <SelectPrimitive.ItemIndicator className="absolute right-4">
      <CheckIcon className="size-7 text-primary-default" />
    </SelectPrimitive.ItemIndicator>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

const SelectSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator
    data-slot="select-separator"
    className={cn('bg-gray-200 -mx-1 my-1 h-px', className)}
    {...props}
  />
);

const SelectScrollUpButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => (
  <SelectPrimitive.ScrollUpButton
    data-slot="select-scroll-up-button"
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUpIcon className="size-4 text-gray-500" />
  </SelectPrimitive.ScrollUpButton>
);

const SelectScrollDownButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => (
  <SelectPrimitive.ScrollDownButton
    data-slot="select-scroll-down-button"
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDownIcon className="size-4 text-gray-500" />
  </SelectPrimitive.ScrollDownButton>
);

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
