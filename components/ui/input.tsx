import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, title, type, ...props }, ref) => {
    return (
      <div className={cn(!title && "text-start")}>
        {title && <span className="text-body4Bold text-caremedi-base-700 ">{title}</span>}
        <input
          type={type}
          className={cn(
            "flex w-full border-b border-caremedi-gray-300 bg-background py-4 text-base ring-offset-background file:border-0 file:bg-transparent file:text-body3Medium file:text-caremedi-gray-500 placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            !title && "px-2",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
