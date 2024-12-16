import React from "react"

import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { Skeleton } from "./ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

const TabSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }, (_, index) => (
        <TabsTrigger key={index} value={String(index)} className="pointer-events-none">
          <Skeleton key={index} className="h-5 w-[40px]" /> {/* 제목 Skeleton */}
        </TabsTrigger>
      ))}
    </>
  )
}

export default TabSkeleton
