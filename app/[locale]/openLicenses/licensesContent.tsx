"use client"

import React, { useEffect, useRef, useState } from "react"
import { SearchParams } from "@/types"

import { ScrollArea } from "@/components/ui/scroll-area"
import OfflineReload from "@/components/offlineReload"
import ScrollToTopButton from "@/components/scrollToTopButton"

type Props = {
  searchParams: SearchParams
  locale: string
}
const LicensesContent = ({ searchParams, locale }: Props) => {
  console.log("🚀 ~ LicensesContent ~ searchParams, locale:", searchParams, locale)
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
          <div>go</div>
          <div className="h-[5000px]" />
          <ScrollToTopButton scrollAreaRef={scrollAreaRef} />
        </ScrollArea>
      )}
    </div>
  )
}

export default LicensesContent
