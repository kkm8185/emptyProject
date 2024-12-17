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
  /** FAQ API 호출 */
  return useSuspenseInfiniteQuery({
    queryKey: ["faq", search],
    queryFn: ({ pageParam = page }) => {
      const queryObject: queryObject = {
        page: pageParam,
        size: size,
      }
      // 전체가 아닐 경우, param에서 category값 추가
      if (category !== "전체") queryObject.category = category
      return getFAQs(createQueryString(queryObject))
    }, // Todo API 넘기는 작업 해야함.
    initialPageParam: page, // 최초값 지정
    /**
     * 다음 페이지를 요청할지 여부를 결정
     * @param lastPage
     * @param allPages
     * @returns 다음 페이지 번호는 현재 로드된 페이지 수 + 1 or 모든 항목이 이미 로드되었다면, undefined를 반환하여 다음 페이지 요청을 중단
     */
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage.response.totalCount // 서버에서 제공하는 총 FAQ 수
      const currentCount = allPages.reduce((acc, page) => acc + page.response.faqs.length, 0) // 현재까지 로드된 FAQ 항목의 총 수
      return currentCount < totalCount ? allPages.length + 1 : undefined
    },
  })
}

export default useFaqQuery
