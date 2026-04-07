import * as React from "react";

import { cn } from "@/components/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-[0.5px] border-[#adaba9] border-input bg-[#faf6f0] px-3 py-2 text-base text-[#32241b] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#2b241a] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offse disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

