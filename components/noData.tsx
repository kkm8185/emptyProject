import React from "react"

import { cn } from "@/lib/utils"

type Props = {
  title: string
}
const NoData = ({ title }: Props) => {
  return (
    <div className="mt-36 text-center">
      <span className={cn("text-body4Medium text-caremedi-primary-500")}>{title}</span>
    </div>
  )
}

export default NoData
