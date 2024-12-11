import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { Config, extendTailwindMerge, twJoin, twMerge } from "tailwind-merge"

import enLang from "../locales/en"
import koLang from "../locales/ko"

declare module "tailwind-merge" {
  interface Config {
    classGroups: {
      fontSize: string[]
    }
  }
}
// dayjs에 UTC 및 timezone 플러그인 추가
dayjs.extend(utc)
dayjs.extend(timezone)
// 기본 시간대를 서울로 설정
dayjs.tz.setDefault("Asia/Seoul")

export { dayjs as dayjsUtil }
/**
 * className을 합쳐 반환합니다.
 * @param inputs - 클래스 이름의 배열 또는 목록
 * @returns 합쳐진 클래스 이름
 */

export function cnJoin(...inputs: ClassValue[]) {
  return twJoin(clsx(inputs))
}

// const customTwMerge = extendTailwindMerge({
//   extend: {
//     classGroups: {
//       fontSize: [
//         "h1Bold",
//         "h1Regular",
//         "h1Medium",
//         "h2Bold",
//         "h2Medium",
//         "h2Regular",
//         "h3Bold",
//         "h3Medium",
//         "h3Regular",
//         "h4Bold",
//         "h4Medium",
//         "h4Regular",
//         "h5Bold",
//         "h5Medium",
//         "h5Regular",
//         "body1Bold",
//         "body1Medium",
//         "body1Regular",
//         "body2Bold",
//         "body2Medium",
//         "body2Regular",
//         "body3Bold",
//         "body3Medium",
//         "body3Regular",
//         "body4Bold",
//         "body4Medium",
//         "body4Regular",
//         "body5Bold",
//         "body5Medium",
//         "body5Regular",
//         "captionBold",
//         "captionMedium",
//         "captionRegular",
//       ],
//     },
//   },
// })
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Correct group name is 'font-size', not 'fontSize'
      "font-size": ["text"],
    },
  },
})
export function cn(...inputs: ClassValue[]) {
  console.log("🚀 ~ cn ~ inputs:", inputs)
  console.log("🚀 ~ cn ~ clsx(inputs):", clsx(inputs))
  console.log("🚀 ~ cn ~ twMerge(clsx(inputs)):", twMerge(clsx(inputs)))
  console.log("🚀 ~ cn ~ customTwMerge(clsx(inputs)):", customTwMerge(clsx(inputs)))
  return customTwMerge(clsx(inputs))
}

/**
 * 주어진 날짜를 특정 형식으로 반환합니다.
 * @param date - 날짜 문자열 또는 Date 객체
 * @param opts - 선택적 옵션 객체
 * @param opts.format - 반환할 날짜 형식 (기본값: "YYYY-MM-DD")
 * @param opts.tz - 시간대 (기본값: 기본 시간대 사용)
 * @returns 포맷된 날짜 문자열 또는 null
 */
export function formatDate(
  date: string | Date,
  opts: { format?: string; tz?: string } = {
    format: "YYYY-MM-DD",
  }
) {
  if (!date) return null
  return dayjs(date).tz(opts.tz).format(opts.format)
}
/**
 * 객체의 키 값을 배열로 반환합니다.
 * @param object - 키 값을 추출할 객체
 * @returns 객체의 키 값을 포함하는 배열
 * @example
 * // 입력: { name: "Alice", age: 30 }
 * // 출력: ['name', 'age']
 */
export function typedObjectKeys<T extends object>(object: T) {
  return Object.keys(object) as (keyof T)[]
}
/**
 * 정보를 콘솔에 출력한다.
 *
 * @export
 * @param {string} - 로그 제목
 * @param {(Record<string, unknown> | object)} - 로그에 포함할 값 ( 객체 형태 )
 */
export function infoLog(title: string, value: Record<string, unknown> | object | undefined | string) {
  console.info(title, JSON.stringify(value, undefined, 4))
}

const messages: Record<string, typeof enLang> = {
  en: enLang,
  ko: koLang,
}

/**
 * locale을 통한 번역 객체
 * @param locale - locale 값 ( 현 2024-12-11 기준 'en', 'ko')
 * @returns locale값에 대한 번역 객체 제공
 */
export async function getMessages(locale: string) {
  return messages[locale] || messages.en // 기본 locale 값은 en
}
