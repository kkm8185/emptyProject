"use client"

import React, { Suspense, useEffect, useRef, useState } from "react"
import { SearchParams } from "@/types"

import { ScrollArea } from "@/components/ui/scroll-area"
import OfflineReload from "@/components/offlineReload"
import ScrollToTopButton from "@/components/scrollToTopButton"

import PermissionInfoData from "./permissionInfoData"
import PermissionInfoRowItem from "./permissionInfoRowItem"

type Props = {
  searchParams: SearchParams
  locale: string
}
const PermissionInfoContent = ({ searchParams, locale }: Props) => {
  console.log("🚀 ~ PermissionInfoContent ~ searchParams, locale:", searchParams, locale)
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
          <Suspense
            fallback={
              <div className="mx-3 flex flex-col gap-4">
                {Array.from({ length: 9 }, (_, index) => (
                  <PermissionInfoRowItem key={index} isLoading />
                ))}
              </div>
            }
          >
            <PermissionInfoData searchParams={searchParams} />
          </Suspense>
          <ScrollToTopButton scrollAreaRef={scrollAreaRef} />
        </ScrollArea>
      )}
    </div>
  )
}

export default PermissionInfoContent
