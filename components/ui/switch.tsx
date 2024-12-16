"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn, cnJoin } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(false) // 스위치 상태 관리

  const handleToggle = () => {
    setIsChecked((prev) => !prev) // 스위치 상태 토글
  }
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer relative inline-flex h-7 w-[68px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:!bg-caremedi-gray-300 data-[state=checked]:bg-caremedi-primary-700 data-[state=unchecked]:bg-caremedi-base-300",
        className
      )}
      {...props}
      ref={ref}
      onClick={handleToggle} // 클릭 시 상태 변경
    >
      <span
        className={cnJoin(
          "absolute text-body4Regular text-caremedi-gray-100",
          props.disabled && "!text-caremedi-gray-400",
          isChecked && "left-[11px]",
          !isChecked && "left-[31px]"
        )}
      >
        {isChecked ? "ON" : "OFF"}
      </span>
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-caremedi-gray-100 shadow-lg ring-0 transition-transform  data-[state=checked]:translate-x-10 data-[state=unchecked]:translate-x-1",
          props.disabled && "bg-caremedi-gray-400"
        )}
      />
    </SwitchPrimitives.Root>
  )
})

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
