import React from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Skeleton } from "./ui/skeleton"

const AccordionSkeleton = () => {
  return (
    <Accordion type="single" collapsible className="w-full px-4">
      {Array.from({ length: 5 }, (_, index) => (
        <AccordionItem key={index} value={"item" + index}>
          <AccordionTrigger>
            <Skeleton key={index} className="h-7 w-[250px] lg:w-[550px]" /> {/* 제목 Skeleton */}
          </AccordionTrigger>
          <AccordionContent>
            <Skeleton key={index} className="h-7 w-[250px] lg:w-[550px]" /> {/* 내용 Skeleton */}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionSkeleton