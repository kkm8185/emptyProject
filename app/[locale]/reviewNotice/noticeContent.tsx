"use client"

import React, { useEffect, useRef, useState } from "react"
import { SearchParams } from "@/types"
import { useInView } from "react-intersection-observer"

import { checkContentType, cn, formatDateAType } from "@/lib/utils"
import useNoticeQuery from "@/hooks/useNoticeQuery"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import AccordionSkeleton from "@/components/accordionSkeleton"
import { ReadOnlyPlateEditor } from "@/components/editor/read-only-plate-editor"
import MiniLoader from "@/components/icons/mini-loader"
import NoData from "@/components/noData"
import OfflineReload from "@/components/offlineReload"
import ScrollToTopButton from "@/components/scrollToTopButton"

type Props = {
  locale: string
  searchParams: SearchParams
}
const NoticeContent = ({ locale, searchParams }: Props) => {
  const [isServerOffline, setIsServerOffline] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null) // ScrollArea를 위한 ref

  /**
   * data : Fetch 함수를 통해 가져온 데이터
   * error : 오류
   * isLoading : 처음 로딩 중 여부 Boolean
   * isFetchingNextPage : 다음 페이지 가져오는 중 체크 Boolean
   * hasNextPage : 다음 페이지 여부 Boolean
   * fetchNextPage : 다음 페이지 가져오는 함수
   */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isLoading } = useNoticeQuery(searchParams)

  /** 인터넷 끊김 여부 체크 */
  const handleServerOfflineState = () => {
    window.addEventListener("offline", () => {
      console.log("offline")
      setIsServerOffline(true)
    })
    window.addEventListener("online", () => {
      console.log("online")
      setIsServerOffline(false)
    })
  }
  const { ref: loadMoreRef, inView } = useInView()

  /** 다음 페이지가 있고, inView면 다음 데이터 호출 */
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  /** 최초 렌더링 시, window Event 등록 */
  useEffect(() => {
    handleServerOfflineState()
    return () => {
      window.removeEventListener("online", handleServerOfflineState)
      window.removeEventListener("offline", handleServerOfflineState)
    }
  }, [])
  if (error) return <div>Error: {error.message}</div>
  const NoticeTypeContent = (content: string) => {
    console.log("🚀 ~ NoticeTypeContent ~ content:", content)
    const type = checkContentType(content)
    switch (type) {
      case "markUp":
        return (
          <div
            className=" break-keep text-body5Regular text-caremedi-base-700"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )
      case "text":
        return <span className=" break-keep text-body5Regular text-caremedi-base-700">{content}</span>
      case "json":
        return <ReadOnlyPlateEditor value={JSON.parse(content)} />
    }
  }
  return (
    <div className="overflow-y-hidden">
      {isLoading ? (
        /** 최초 로딩 시 */
        <AccordionSkeleton length={10} />
      ) : isServerOffline ? (
        /** 인터넷이 끊겼을 경우 */
        <OfflineReload />
      ) : data?.pages.length === 0 || data?.pages.every((page) => page.response.notices.length === 0) ? (
        /** 데이터가 없을 경우 */
        <NoData title="등록된 공지사항이 없습니다." />
      ) : (
        /** 데이터가 있을 경우 */
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <Accordion type="single" collapsible className="w-full px-4">
            {data?.pages.map((page) =>
              page.response.notices.map((notice) => {
                return (
                  <AccordionItem value={notice.appNoticeId} key={notice.appNoticeId}>
                    <AccordionTrigger>
                      <div className="flex flex-col text-left">
                        <span className="text-body4Bold text-caremedi-base-700">{notice.subject}</span>
                        <span className="text-body5Regular text-caremedi-base-700">
                          {formatDateAType(notice.createdAt, locale)}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="mt-1 p-2">{NoticeTypeContent(notice.content)}</AccordionContent>
                  </AccordionItem>
                )
              })
            )}
          </Accordion>
          <div
            /** 더보기 영역 */
            ref={loadMoreRef}
            className={cn("mt-2 flex h-10 items-center justify-center bg-gray-200 text-center", {
              "h-0 bg-transparent": !isFetchingNextPage && !hasNextPage,
            })}
          >
            {isFetchingNextPage ? (
              <MiniLoader className="mx-0 size-4 text-primary-foreground" />
            ) : hasNextPage ? (
              <span className="text-body5Regular text-caremedi-base-700">더 보기</span>
            ) : null}
          </div>
          <ScrollBar orientation="vertical" />
          <ScrollToTopButton scrollAreaRef={scrollAreaRef} />
        </ScrollArea>
      )}
    </div>
  )
}

export default NoticeContent
