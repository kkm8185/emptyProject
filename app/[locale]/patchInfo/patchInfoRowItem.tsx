import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

type RowItemProps = {
  isLoading: boolean
  label?: string
  value?: string
  isLast?: boolean
}
const PatchInfoRowItem = ({ isLoading, label, value, isLast = false }: RowItemProps) => {
  return (
    <div className="mx-4 flex flex-col gap-1">
      <div className="flex h-9 flex-row items-center justify-between">
        {isLoading ? (
          <>
            <Skeleton className="h-5 w-[80px]" />
            <Skeleton className="h-5 w-[80px]" />
          </>
        ) : (
          <>
            <span className="text-body4Medium text-caremedi-base-600">{label}</span>
            <span className="text-body4Medium text-caremedi-base-600">{value}</span>
          </>
        )}
      </div>
      <div className={cn("w-full border-b border-caremedi-gray-200", { "border-b-0": isLast })} />
    </div>
  )
}
export default PatchInfoRowItem
