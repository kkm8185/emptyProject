import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { buttonCompoundVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      /** 각 variant 값 별로 css 상이하게 적용
       *  text 색상에 대해 important 설정한 이유는 size에서 text-body5Medium 과 같은 값을 적용하면 색상 값이 덮어 씌워지기 때문에 설정
       */
      variant: {
        default:
          "bg-caremedi-primary-600 hover:bg-caremedi-primary-100 !text-caremedi-gray-100 hover:!text-caremedi-primary-400",
        defaultTint:
          "bg-caremedi-primary-200 hover:bg-caremedi-secondary-100 !text-caremedi-primary-600 hover:!text-caremedi-primary-400",
        defaultGray:
          "bg-caremedi-gray-1000 hover:bg-caremedi-gray-600 !text-caremedi-gray-100 hover:!text-caremedi-gray-100",
        ghost: "text-caremedi-primary-600 hover:text-caremedi-primary-300",
        outline:
          "border-caremedi-primary-600 hover:bg-caremedi-primary-100 hover:border-caremedi-primary-300 !text-caremedi-primary-600 hover:!text-caremedi-primary-300 border-2",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "text-body3Medium h-12 w-[158px] py-3",
        sm: "text-body5Medium h-9 min-w-[70px] px-2 py-[9px]",
        lg: "text-body3Medium h-[54px] w-[328px] py-[15px]",
        icon: "h-10 w-10",
      },
      disabled: {
        true: "cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: buttonCompoundVariants,
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, "disabled"> {
  // disabled 제외
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, disabled }))}
        ref={ref}
        disabled={disabled} // disabled 속성 전달
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
