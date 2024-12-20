"use client"

import React, { memo } from "react"
import { useFaqStore } from "@/store"
import { useQuery } from "@tanstack/react-query"

import { getFAQCategoryList } from "@/lib/api/faq"
import { TabsTrigger } from "@/components/ui/tabs"
import TabSkeleton from "@/components/tabSkeleton"

/**
 * FAQ Tab List 컴포넌트
 */
const FaqTabList = () => {
  const { setCategoryList } = useFaqStore()

  const { data: categoryList = [], isLoading } = useQuery({
    queryKey: ["FaqCategoryList"], // 쿼리 키
    queryFn: async () => {
      /** 카테고리 리스트 API 호출 */
      const TempList = await getFAQCategoryList()
      setCategoryList(TempList)
      return TempList
    },
  })
  return (
    <>
      {isLoading /** API 호출 대기 중일 시, 스켈레톤 노출 */ ? (
        <TabSkeleton />
      ) : (
        categoryList.map((data, indx) => (
          <TabsTrigger key={indx} value={data}>
            {data}
          </TabsTrigger>
        ))
      )}
    </>
  )
}

export default memo(FaqTabList)
