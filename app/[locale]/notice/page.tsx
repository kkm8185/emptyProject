"use client"

import React, { useEffect, useState } from "react"
import { SearchParams } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import { createQueryString } from "@toss/utils"
import { useTranslations } from "next-intl"
import { useInView } from "react-intersection-observer"

import { getNotices, noticeSearchParamsSchema } from "@/lib/api/notice"
import { cn } from "@/lib/utils"
import useNoticeQuery from "@/hooks/useNoticeQuery"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import AccordionSkeleton from "@/components/accordionSkeleton"
import MiniLoader from "@/components/icons/mini-loader"
import NoData from "@/components/noData"
import OfflineReload from "@/components/offlineReload"

export interface Props {
  searchParams: SearchParams
}
const Page = ({ searchParams }: Props) => {
  const t = useTranslations() // Access translations

  const [isServerOffline, setIsServerOffline] = useState(false)
  const search = noticeSearchParamsSchema.parse(searchParams)
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
      setIsServerOffline(true)
    })
    window.addEventListener("online", () => {
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

  return (
    <div className="relative flex h-full min-h-screen flex-col gap-4">
      <div className="sticky z-10 py-4 text-center">
        <h1 className="text-h5Regular text-caremedi-gray-1000">{t("notice")}</h1>
      </div>

      <div className="overflow-y-hidden">
        {isLoading ? (
          /** 최초 로딩 시 */
          <AccordionSkeleton />
        ) : isServerOffline ? (
          /** 인터넷이 끊겼을 경우 */
          <OfflineReload />
        ) : data?.pages.length === 0 || data?.pages.every((page) => page.length === 0) ? (
          /** 데이터가 없을 경우 */
          <NoData title="등록된 공지사항이 없습니다." />
        ) : (
          /** 데이터가 있을 경우 */
          <ScrollArea className="h-full">
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
          </ScrollArea>
        )}
      </div>
    </div>
  )
}

export default Page
