"use client";

import { cn } from "@/shared/utils/index";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import * as React from "react";

const OTP = ({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & { containerClassName?: string }) => (
  <OTPInput
    data-slot="input-otp"
    containerClassName={cn(
      "flex items-center gap-2 has-disabled:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
);

const OTPGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="input-otp-group"
    className={cn("flex items-center", className)}
    {...props}
  />
);

const OTPSlot = ({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-primary-default/50 data-[active=true]:aria-invalid:ring-danger-default/20 dark:data-[active=true]:aria-invalid:ring-danger-default/40 aria-invalid:border-danger-default data-[active=true]:aria-invalid:border-danger-default dark:bg-white/30 border-primary-default relative flex size-14 items-center justify-center border-y border-r text-2xl shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px] font-semibold",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
};

const OTPSeparator = ({ ...props }: React.ComponentProps<"div">) => (
  <div data-slot="input-otp-separator" role="separator" {...props}>
    <MinusIcon />
  </div>
);

export { OTP, OTPGroup, OTPSeparator, OTPSlot };
