"use client"

import React, { useEffect, useRef, useState } from "react"
import { SearchParams } from "@/types"
import { useInView } from "react-intersection-observer"

import { cn, formatDateAType } from "@/lib/utils"
import useFaqQuery from "@/hooks/useFaqQuery"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import AccordionSkeleton from "@/components/accordionSkeleton"
import MiniLoader from "@/components/icons/mini-loader"
import NoData from "@/components/noData"
import OfflineReload from "@/components/offlineReload"
import ScrollToTopButton from "@/components/scrollToTopButton"

type Props = {
  locale: string
  searchParams: SearchParams
}
/**
 * 각 FAQ Tab들의 Content 컴포넌트
 * @param searchParams - URL 뒤에 나오는 파라미터
 * @param locale - 언어 값 ( ko-한글 , en-영문)
 */
const FaqContent = ({ searchParams, locale }: Props) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null) // ScrollArea를 위한 ref
  const [isServerOffline, setIsServerOffline] = useState(false)

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1, // 10%가 보일 때 트리거
  })
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isLoading } = useFaqQuery(searchParams)
  /** 인터넷 끊김 여부 체크 */
  const handleServerOfflineState = () => {
    window.addEventListener("offline", () => {
      setIsServerOffline(true)
    })
    window.addEventListener("online", () => {
      setIsServerOffline(false)
    })
  }
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

  return (
    <>
      <ScrollArea className="h-full flex-1" ref={scrollAreaRef}>
        {isLoading ? (
          <AccordionSkeleton />
        ) : isServerOffline ? (
          /** 인터넷이 끊겼을 경우 */
          <OfflineReload />
        ) : data?.pages.length === 0 || data?.pages.every((page) => page.response.faqs.length === 0) ? (
          /** 데이터가 없을 경우 */
          <NoData title="등록된 자주 묻는 질문이 없습니다." />
        ) : (
          <>
            <Accordion type="single" collapsible className="w-full px-4">
              {data?.pages.map((page) =>
                /** 데이터 보여주기 */
                page.response.faqs.map((faq) => {
                  const valueData = "item" + faq.appFaqId
                  return (
                    <AccordionItem value={valueData} key={faq.appFaqId}>
                      <AccordionTrigger>
                        <div className="flex flex-col text-left">
                          <span className="text-body4Bold text-caremedi-base-700">{faq.subject}</span>
                          <span className="text-body5Regular text-caremedi-base-700">
                            {formatDateAType(faq.createdAt, locale)}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="mt-1 p-2">
                        <span className="break-keep text-body5Regular text-caremedi-base-700">{faq.content}</span>
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
                <span className="h-3 text-sm font-bold tracking-[-.04em] text-[#253736]">더 보기</span>
              ) : null}
            </div>
          </>
        )}
        <ScrollBar orientation="vertical" />
        <ScrollToTopButton scrollAreaRef={scrollAreaRef} />
      </ScrollArea>
    </>
  )
}

export default FaqContent
