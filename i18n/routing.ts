import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  /** 지원하는 언어 설정 */
  locales: ["ko", "en"],
  /** 기본 언어 설정 */
  defaultLocale: "en",
})

// Next.js 탐색 API에 대한 경량 래퍼
// 라우팅 구성 설정
// 기존 next js에서 제공하는 Link, redirect, usePathname, useRouter를 대체합니다.
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
