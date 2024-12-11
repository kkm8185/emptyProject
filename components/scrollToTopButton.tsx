import React, { useEffect, useState } from "react"
import { RiArrowUpCircleFill } from "@remixicon/react"

import { Button } from "./ui/button"

type Props = {
  scrollAreaRef: React.RefObject<HTMLDivElement>
}
const ScrollToTopButton = ({ scrollAreaRef }: Props) => {
  const [isAtTop, setIsAtTop] = useState(true)

  const scrollToTop = () => {
    /** shadcn ScrollArea 스크롤 영역의 뷰포트 */
    const scrollContainer = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]")
    if (scrollContainer) {
      /** top으로 이동 */
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      console.error("Scroll container not found")
    }
  }
  useEffect(() => {
    /** shadcn ScrollArea 스크롤 영역의 뷰포트 */
    const scrollContainer = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]")
    if (scrollContainer) {
      const handleScroll = () => {
        /** 탑 체크하는 handler */
        setIsAtTop(scrollContainer.scrollTop === 0)
      }
      /** 스크롤에 대한 이벤트 리스너 추가 */
      scrollContainer.addEventListener("scroll", handleScroll)

      return () => {
        /** 해당 컴포넌트 언마운트 시, 이벤트 리스너 제거 */
        scrollContainer.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])
  return (
    <>
      {!isAtTop && ( // Top이 아닐 경우에만 버튼 제공
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 !z-50 flex size-7 items-center justify-center rounded-full bg-caremedi-gray-100 [&_svg]:size-7"
        >
          <RiArrowUpCircleFill size={32} className="text-caremedi-primary-500" />
        </Button>
      )}
    </>
  )
}

export default ScrollToTopButton
