"use client"

import React, { Suspense } from "react"
import { useFaqStore } from "@/store"
import { SearchParams } from "@/types"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsList } from "@/components/ui/tabs"
import AccordionSkeleton from "@/components/accordionSkeleton"

import FaqContent from "./faqContent"
import FaqTabList from "./faqTabList"

type Props = {
  locale: string
  searchParams: SearchParams
}
/**
 * FAQ Tab 컴포넌트
 * @param searchParams - URL 뒤에 나오는 파라미터
 * @param locale - 언어 값 ( ko-한글 , en-영문)
 */
const FaqTabs = ({ searchParams, locale }: Props) => {
  const { category, setCategory, categoryList } = useFaqStore()

  const handleTabValueChange = (tabValue: string) => {
    setCategory(tabValue)
  }

  return (
    <Tabs defaultValue="전체" className="flex h-full flex-col gap-4" onValueChange={handleTabValueChange}>
      <ScrollArea className="mx-3">
        <div className="relative h-10 w-full">
          <TabsList className="absolute flex">
            <FaqTabList />
          </TabsList>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {categoryList.length !== 0 && (
        <Suspense fallback={<AccordionSkeleton length={5} />}>
          <FaqContent searchParams={{ ...searchParams, category }} locale={locale} />
        </Suspense>
      )}
    </Tabs>
  )
}

export default FaqTabs
