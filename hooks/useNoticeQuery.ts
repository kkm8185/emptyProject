import { SearchParams } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import { createQueryString } from "@toss/utils"

import { getNotices } from "@/lib/api/notice"

const useNoticeQuery = (search: SearchParams = {}) => {
  // Todo Search Param 초기값 등록하는 작업 필요
  const { page = 1, size = 10 } = search
  return useInfiniteQuery({
    queryKey: ["notice", search],
    queryFn: ({ pageParam = page }) => getNotices(createQueryString({ page: pageParam, size: size })), // Todo API 넘기는 작업 해야함.
    initialPageParam: page,
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage.response.totalCount
      const currentCount = allPages.reduce((acc, page) => acc + page.response.notices.length, 0)
      return currentCount < totalCount ? allPages.length + 1 : undefined
    },
  })
}

export default useNoticeQuery
