import React from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Skeleton } from "./ui/skeleton"

type Props = {
  length?: number
}
const AccordionSkeleton = ({ length = 10 }: Props) => {
  return (
    <Accordion type="single" collapsible className="w-full px-4">
      {Array.from({ length: length }, (_, index) => (
        <AccordionItem key={index} value={"item" + index}>
          <AccordionTrigger>
            <Skeleton key={index} className="h-[38px] w-[250px] lg:w-[550px]" /> {/* 제목 Skeleton */}
          </AccordionTrigger>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionSkeleton
