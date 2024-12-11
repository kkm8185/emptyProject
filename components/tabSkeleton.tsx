import React from "react"

import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { Skeleton } from "./ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

const TabSkeleton = () => {
  return (
    <Tabs defaultValue="all" className="flex h-full flex-col gap-4 ">
      <ScrollArea className="mx-3">
        <div className="relative h-9 w-full">
          <TabsList className="absolute flex">
            {Array.from({ length: 5 }, (_, index) => (
              <TabsTrigger key={index} value={String(index)}>
                <Skeleton key={index} className="h-7 w-[40px]" /> {/* 제목 Skeleton */}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Tabs>
  )
}

export default TabSkeleton
