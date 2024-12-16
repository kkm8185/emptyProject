import { useFaqStore } from "@/store"
import { SearchParams } from "@/types"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { createQueryString } from "@toss/utils"

import { getFAQs } from "@/lib/api/faq"

type queryObject = {
  page: number | string | string[]
  size: number | string | string[]
  category?: string
}
const useFaqQuery = (search: SearchParams = {}) => {
  const { category } = useFaqStore()

  // Todo Search Param 초기값 등록하는 작업 필요
  const { page = 1, size = 10 } = search
  return useSuspenseInfiniteQuery({
    queryKey: ["notice", search],
    queryFn: ({ pageParam = page }) => {
      const queryObject: queryObject = {
        page: pageParam,
        size: size,
      }
      if (category !== "전체") queryObject.category = category
      return getFAQs(createQueryString(queryObject))
    }, // Todo API 넘기는 작업 해야함.
    initialPageParam: page,
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage.response.totalCount
      const currentCount = allPages.reduce((acc, page) => acc + page.response.faqs.length, 0)
      return currentCount < totalCount ? allPages.length + 1 : undefined
    },
  })
}

export default useFaqQuery
