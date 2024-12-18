import Link from "next/link"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

type RowItemProps = {
  isLoading: boolean
  label?: string
  value?: string
}
const PermissionInfoRowItem = ({ isLoading, label, value }: RowItemProps) => {
  const t = useTranslations()
  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <Skeleton className="h-5 w-[80px]" />
          <Skeleton className="h-5 w-[250px]" />
        </>
      )
    }
    const isIfuLabel = label === t("ifu")

    return (
      <>
        <span className="text-body3Bold text-caremedi-base-600">{label}</span>
        {isIfuLabel ? (
          <Link href="/ko/notice" className="text-body3Medium text-caremedi-base-600">
            {t("link")}
          </Link>
        ) : (
          <span className="text-body4Medium text-caremedi-base-600">{value}</span>
        )}
      </>
    )
  }
  return (
    <div className={cn("flex flex-col gap-1", label === t("ifu") && "flex-row items-center justify-between")}>
      {renderContent()}
    </div>
  )
}
export default PermissionInfoRowItem
