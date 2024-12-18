"use client"

import React, { Suspense, useEffect, useRef, useState } from "react"
import { SearchParams } from "@/types"

import { ScrollArea } from "@/components/ui/scroll-area"
import OfflineReload from "@/components/offlineReload"
import ScrollToTopButton from "@/components/scrollToTopButton"

import ServerDataFetch from "./serverDataFetch"

type Props = {
  searchParams: SearchParams
  locale: string
  data: any // 서버 데이터를 위한 타입 추가
}
const TermsContent = ({ searchParams, locale, data }: Props) => {
  console.log("🚀 ~ TermsContent ~ searchParams, locale :", searchParams, locale)
  const scrollAreaRef = useRef<HTMLDivElement>(null) // ScrollArea를 위한 ref
  const [isServerOffline, setIsServerOffline] = useState(false)

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

  /** 최초 렌더링 시, window Event 등록 */
  useEffect(() => {
    handleServerOfflineState()
    return () => {
      window.removeEventListener("online", handleServerOfflineState)
      window.removeEventListener("offline", handleServerOfflineState)
    }
  }, [])
  return (
    <div className="overflow-y-hidden">
      {isServerOffline ? (
        /** 인터넷이 끊겼을 경우 */
        <OfflineReload />
      ) : (
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <Suspense fallback={<div>Loading...</div>}>
            <ServerDataFetch data={data} />
          </Suspense>
          <ScrollToTopButton scrollAreaRef={scrollAreaRef} />
        </ScrollArea>
      )}
    </div>
  )
}

export default TermsContent
