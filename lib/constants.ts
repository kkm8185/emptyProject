type VariantType = "default" | "defaultTint" | "defaultGray" | "destructive" | "outline" | "ghost" | "link"
type SizeType = "default" | "sm" | "lg" | "icon"

export const IS_DEV = process.env.NODE_ENV !== "production"

export const BUTTON_COMPOUND_VARIANTS : {
  variant: VariantType
  size?: SizeType // Ensure size is a single string
  disabled?: boolean
  className: string
}[] = [
  {
    variant: "default",
    size: "default",
    disabled: true,
    className: "text-body3Medium !text-caremedi-gray-500 bg-caremedi-gray-300",
  },
  {
    variant: "default",
    size: "lg",
    disabled: true,
    className: "text-body3Medium !text-caremedi-gray-500 bg-caremedi-gray-300",
  },
  {
    variant: "default",
    size: "sm",
    disabled: true,
    className: "text-body5Medium !text-caremedi-gray-500 bg-caremedi-gray-300",
  },
  {
    variant: "defaultTint",
    size: "default",
    disabled: true,
    className: "text-body3Medium !text-caremedi-base-300 bg-caremedi-gray-300",
  },
  {
    variant: "defaultTint",
    size: "lg",
    disabled: true,
    className: "text-body3Medium !text-caremedi-base-300 bg-caremedi-gray-300",
  },
  {
    variant: "defaultTint",
    size: "sm",
    disabled: true,
    className: "text-body5Medium !text-caremedi-base-300 bg-caremedi-gray-300",
  },
  {
    variant: "defaultGray",
    size: "default",
    disabled: true,
    className: "text-body3Medium !text-caremedi-gray-400 bg-caremedi-gray-100",
  },
  {
    variant: "defaultGray",
    size: "lg",
    disabled: true,
    className: "text-body3Medium !text-caremedi-gray-400 bg-caremedi-gray-100",
  },
  {
    variant: "defaultGray",
    size: "sm",
    disabled: true,
    className: "text-body5Medium !text-caremedi-gray-400 bg-caremedi-gray-100",
  },
  {
    variant: "ghost",
    size: "default",
    disabled: true,
    className: "text-body3Medium !text-caremedi-gray-400", // disabled 상태의 스타일
  },
  {
    variant: "ghost",
    size: "lg",
    disabled: true,
    className: "text-body3Medium !text-caremedi-gray-400", // disabled 상태의 스타일
  },
  {
    variant: "ghost",
    size: "sm",
    disabled: true,
    className: "text-body5Medium !text-caremedi-gray-400", // disabled 상태의 스타일
  },
  {
    variant: "outline",
    size: "sm",
    className: "border", // sm 사이즈의 outline 스타일
  },
  {
    variant: "outline",
    size: "default",
    disabled: true,
    className: "text-body3Medium !text-caremedi-gray-400 bg-caremedi-gray-200 border-caremedi-gray-400", // disabled 상태의 스타일
  },
  {
    variant: "outline",
    size: "lg",
    disabled: true,
    className: "text-body3Medium !text-caremedi-gray-400 bg-caremedi-gray-200 border-caremedi-gray-400", // disabled 상태의 스타일
  },
  {
    variant: "outline",
    size: "sm",
    disabled: true,
    className: "text-body5Medium !text-caremedi-gray-400 bg-caremedi-gray-200 border-caremedi-gray-400 border ", // disabled 상태의 스타일
  },
]

export const CUSTOM_FONT_TAILWIND_CLASSES = [
  "text-h1Bold",
  "text-h1Regular",
  "text-h1Medium",
  "text-h2Bold",
  "text-h2Medium",
  "text-h2Regular",
  "text-h3Bold",
  "text-h3Medium",
  "text-h3Regular",
  "text-h4Bold",
  "text-h4Medium",
  "text-h4Regular",
  "text-h5Bold",
  "text-h5Medium",
  "text-h5Regular",
  "text-body1Bold",
  "text-body1Medium",
  "text-body1Regular",
  "text-body2Bold",
  "text-body2Medium",
  "text-body2Regular",
  "text-body3Bold",
  "text-body3Medium",
  "text-body3Regular",
  "text-body4Bold",
  "text-body4Medium",
  "text-body4Regular",
  "text-body5Bold",
  "text-body5Medium",
  "text-body5Regular",
  "text-captionBold",
  "text-captionMedium",
  "text-captionRegular",
]
