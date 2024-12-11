"use client"

import React, { useEffect, useRef, useState } from "react"
import { SearchParams } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import { createQueryString } from "@toss/utils"
import { useInView } from "react-intersection-observer"
import ScrollToTop from "react-scroll-to-top"

import { getNotices, noticeSearchParamsSchema } from "@/lib/api/notice"
import { cn } from "@/lib/utils"
import useFaqQuery from "@/hooks/useFaqQuery"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccordionSkeleton from "@/components/accordionSkeleton"
import MiniLoader from "@/components/icons/mini-loader"
import ScrollToTopButton from "@/components/scrollToTopButton"
import TabSkeleton from "@/components/tabSkeleton"

import FaqContent from "./faqContent"

export interface Props {
  searchParams: SearchParams
}
const Page = ({ searchParams }: Props) => {
  const [isServerOffline, setIsServerOffline] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null) // ScrollArea를 위한 ref

  /** 인터넷 끊김 여부 체크 */
  const handleServerOfflineState = () => {
    window.addEventListener("offline", () => {
      setIsServerOffline(true)
    })
    window.addEventListener("online", () => {
      setIsServerOffline(false)
    })
  }

  /** 다음 페이지가 있고, inView면 다음 데이터 호출 */

  useEffect(() => {
    handleServerOfflineState()
    return () => {
      window.removeEventListener("online", handleServerOfflineState)
      window.removeEventListener("offline", handleServerOfflineState)
    }
  }, [])

  /** 최초 렌더링 시, window Event 등록 */
  const tabData = [
    { value: "all", label: "전체" },
    { value: "posts", label: "포스트" },
    { value: "comments", label: "코멘트" },
    { value: "albums", label: "앨범" },
    { value: "photos", label: "포토" },
    { value: "todos", label: "투두" },
    { value: "users", label: "유저" },
  ]

  const handleOnClick = () => {
    console.log("reload")
    window.location.reload()
  }
  const search = noticeSearchParamsSchema.parse(searchParams)
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5, // 10%가 보일 때 트리거
  })
  /**
   * data : Fetch 함수를 통해 가져온 데이터
   * error : 오류
   * isLoading : 처음 로딩 중 여부 Boolean
   * isFetchingNextPage : 다음 페이지 가져오는 중 체크 Boolean
   * hasNextPage : 다음 페이지 여부 Boolean
   * fetchNextPage : 다음 페이지 가져오는 함수
   */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isLoading } = useFaqQuery(searchParams)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="relative flex h-full min-h-screen flex-col gap-4">
      <div className="bg-white text-center">
        <h1 className="py-4 text-h5Regular text-caremedi-gray-1000">자주 묻는 질문</h1>
      </div>
      {/* <TabSkeleton /> */}
      <div className="overflow-y-hidden">
        <Tabs defaultValue="all" className="flex h-full flex-col gap-4 ">
          <ScrollArea className="mx-3">
            <div className="relative h-10 w-full">
              <TabsList className="absolute flex">
                {tabData.map((data) => (
                  <TabsTrigger key={data.value} value={data.value}>
                    {data.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <ScrollArea className="h-full flex-1" ref={scrollAreaRef}>
            {tabData.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="h-full">
                  <Accordion type="single" collapsible className="px-4">
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
                              <span className="break-keep text-body5Regular text-caremedi-base-700">{notice.body}</span>
                            </AccordionContent>
                          </AccordionItem>
                        )
                      })
                    )}
                  </Accordion>
                  <div
                    /** 더보기 영역 */
                    ref={loadMoreRef}
                    className={cn(" mt-2 flex h-10 items-center justify-center bg-gray-200 text-center", {
                      "h-0 bg-transparent": !isFetchingNextPage && !hasNextPage,
                    })}
                  >
                    {isFetchingNextPage ? (
                      <MiniLoader className="mx-0 size-4 text-primary-foreground" />
                    ) : hasNextPage ? (
                      <span className="text-body5Regular text-caremedi-base-700">더 보기</span>
                    ) : null}
                  </div>
                </div>
              </TabsContent>
            ))}
            <ScrollBar orientation="vertical" />
            <ScrollToTopButton scrollAreaRef={scrollAreaRef} />
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  )
}

export default Page
