import React from "react"

import { Skeleton } from "./ui/skeleton"
import { TabsTrigger } from "./ui/tabs"

const TabSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }, (_, index) => (
        <TabsTrigger key={index} value={String(index)} className="pointer-events-none">
          <Skeleton key={index} className="h-5 w-[40px]" />
        </TabsTrigger>
      ))}
    </>
  )
}

export default TabSkeleton
