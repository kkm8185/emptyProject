import React, { useEffect } from "react"
import { SearchParams } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import { createQueryString } from "@toss/utils"
import { useInView } from "react-intersection-observer"

import { getNotices, noticeSearchParamsSchema } from "@/lib/api/notice"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import MiniLoader from "@/components/icons/mini-loader"

type Props = {
  value: string
  searchParams: SearchParams
}

const FaqContent = ({ searchParams, value }: Props) => {
  console.log("🚀 ~ FaqContent ~ value:", value)
  const search = noticeSearchParamsSchema.parse(searchParams)
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1, // 10%가 보일 때 트리거
  })

  const {
    fetchNextPage, // 다음 페이지 가져오는 함수
    hasNextPage, // 다음 페이지 여부 Boolean
    isFetchingNextPage, // 다음 페이지 가져오는 중 체크 Boolean
    data, // Fetch 함수를 통해 가져온 데이터
    error, // 오류
    isLoading, // 처음 로딩중 여부 Boolean
  } = useInfiniteQuery({
    /** 캐시를 위한 key */
    queryKey: ["faq", search],
    /** 데이터 가져오기위한 Fetch 함수
     *  pageParam - page값 < react-query에서 사용하는 고정적인 변수명>
     */
    queryFn: ({ pageParam = search.page }) =>
      getNotices(createQueryString({ _page: pageParam, _limit: search.per_page })),

    /** 처음 로드할 때의 페이지 번호 설정 */
    initialPageParam: search.page,
    /** 마지막 페이지에서 다음 페이지의 번호를 결정하는 함수
     *  lastPage가 비어있지 않다면 다음 페이지 번호를 반환.
     *  lastPage가 비어있다면 undefined 반환
     */
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined
    },
    /** 첫번째 페이지에서 이전 페이지의 번호를 결정하는 함수
     *  이전 페이지가 존재하면 이전 페이지 반환.
     *  이전 페이지가 없으면 undefined 반환
     */
    getPreviousPageParam: (firstPage, allPages) => {
      // firstPage에서 이전 페이지 파라미터를 반환
      return allPages.length > 1 ? allPages.length - 1 : undefined
    },
  })
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="h-full overflow-y-auto">
      <Accordion type="single" collapsible className="w-full px-4">
        {data?.pages.map((page) =>
          /** 반복을 통해 데이터 보여주기 */
          page.map((notice) => {
            const valueData = "item" + notice.id
            return (
              <AccordionItem value={valueData} key={notice.id}>
                <AccordionTrigger>
                  <div className="flex flex-col text-left">
                    <span className="text-body4Bold text-caremedi-base-700">{notice.title}</span>
                    <span className="text-body5Regular text-caremedi-base-700">
                      {notice.id}. 2024. 08. 30 오후 04:25:30
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-1 p-2">
                  <span className=" break-keep text-body5Regular text-caremedi-base-700">{notice.body}</span>
                </AccordionContent>
              </AccordionItem>
            )
          })
        )}
      </Accordion>
      <div
        /** 더보기 영역 */
        ref={loadMoreRef}
        className={cn(
          "my-auto mt-2 flex h-3 items-center justify-center bg-gray-200 text-center",
          !isFetchingNextPage && !hasNextPage && "h-0 bg-transparent"
        )}
      >
        {isFetchingNextPage ? (
          <MiniLoader className="mx-0 size-4 text-primary-foreground" />
        ) : hasNextPage ? (
          <span className="text-sm font-bold tracking-[-.04em] text-[#253736]">더 보기</span>
        ) : null}
      </div>
    </div>
  )
}

export default FaqContent
