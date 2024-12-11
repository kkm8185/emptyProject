import { SearchParams } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import { createQueryString } from "@toss/utils"

import { getNotices } from "@/lib/api/notice"

const useNoticeQuery = (search: SearchParams) => {
  return useInfiniteQuery({
    queryKey: ["notice", search],
    queryFn: ({ pageParam = search.page }) =>
      getNotices(createQueryString({ _page: pageParam, _limit: search.per_page })),
    initialPageParam: search.page,
    getNextPageParam: (lastPage, allPages) => (lastPage.length > 0 ? allPages.length + 1 : undefined),
  })
}

export default useNoticeQuery
