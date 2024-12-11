import { SearchParams } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import { createQueryString } from "@toss/utils"

import { getFAQs } from "@/lib/api/faq"

const useFaqQuery = (search: SearchParams) => {
  return useInfiniteQuery({
    queryKey: ["faq", search],
    queryFn: ({ pageParam = search.page }) => getFAQs(createQueryString({ _page: pageParam, _limit: search.per_page })),
    initialPageParam: search.page,
    getNextPageParam: (lastPage, allPages) => (lastPage.length > 0 ? allPages.length + 1 : undefined),
  })
}

export default useFaqQuery
