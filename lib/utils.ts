import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { extendTailwindMerge, twJoin } from "tailwind-merge"

import enLang from "../locales/en"
import koLang from "../locales/ko"
import { CUSTOM_FONT_TAILWIND_CLASSES } from "./constants"

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
 * @example
 *   입력: ["bg-gray-500","text-gray-500"]
 *   출력: "bg-gray-500 text-gray-500"
 */

export function cnJoin(...inputs: ClassValue[]) {
  return twJoin(clsx(inputs))
}
/** customTwMerge를 이용하여 CUSTOM_FONT_TAILWIND_CLASSES 값들이 color가 아닌 font-size로 설정
 *  text-sm 과 같은 font-size값은 충돌 발생
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": CUSTOM_FONT_TAILWIND_CLASSES,
    },
  },
})
/**
 * className을 충돌된 부분은 내부 로직(TwMerge)을 통해 합쳐 반환합니다.
 * @param inputs - 클래스 이름의 배열 또는 목록
 * @returns 합쳐진 클래스 이름
 * @example
 *   입력: ["bg-gray-500","text-gray-500"]
 *   출력: "bg-gray-500 text-gray-500"
 */
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}

/**
 * 주어진 날짜를 기본 형식(YYYY-MM-DD)으로 반환합니다.
 * @param date - 날짜 문자열 또는 Date 객체
 * @param opts - 선택적 옵션 객체
 * @param opts.format - 반환할 날짜 형식 (기본값: "YYYY-MM-DD")
 * @param opts.tz - 시간대 (기본값: 기본 시간대 사용)
 * @returns 포맷된 날짜 문자열 또는 null
 * @example
 *   입력: { date: "2024-12-13T02:31:12.700+00:00"}
 *   출력: "2024-12-04"
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
 * 주어진 날짜를 특정 형식(YYYY.MM.DD PM hh:mm:ss)으로 반환합니다.
 * @param date - 날짜 문자열 또는 Date 객체
 * @param lang - 언어 설정 ( ko - 한글, en - 영어 )
 * @param opts - 선택적 옵션 객체
 * @param opts.format - 반환할 날짜 형식 (기본값: "YYYY.MM.DD A hh:mm:ss")
 * @returns 포맷된 날짜 문자열 또는 null
 * @example
 *   입력: { date: "2024-12-13T02:31:12.700+00:00", lang: ko }
 *   출력: "2024.12.04 오후 03:51:30"
 */
export function formatDateAType(
  date: string | Date,
  lang: string,
  opts: { format?: string } = {
    format: "YYYY.MM.DD A hh:mm:ss",
  }
) {
  if (!date) return null

  let formattedDate = dayjs(date).format(opts.format)
  if (lang === "ko") formattedDate = formattedDate.replace("AM", "오전").replace("PM", "오후")

  // 포맷 적용
  return formattedDate
}
/**
 * 객체의 키 값을 배열로 반환합니다.
 * @param object - 키 값을 추출할 객체
 * @returns 객체의 키 값을 포함하는 배열
 * @example
 *   입력: { name: "Alice", age: 30 }
 *   출력: ['name', 'age']
 */
export function typedObjectKeys<T extends object>(object: T) {
  return Object.keys(object) as (keyof T)[]
}
/**
 * 정보를 콘솔에 출력한다.
 * @param string - 로그 제목
 * @param value - 로그에 포함할 값 ( 객체 형태 )
 * @returns JSON 문자열로 변환
 * @example
 *   입력: { name: "Alice", age: 30, city: "Seoul" }
 *   출력: { "name": "Alice", "age": 30, "city": "Seoul" }
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
 * @example
 *   입력: ko
 *   출력: locales\ko.ts의 객체 값
 */
export async function getMessages(locale: string) {
  return messages[locale] || messages.en // 기본 locale 값은 en
}

type DataType = Record<string, any>
/**
 * 번역된 Object로 수정
 * @param data - string의 키, 모든 타입의 값 객체 or null or undefined
 * @param t - next-intl의 useTranslations값
 * @returns - {
 *  label - 번역된 key값
 *  value - value값
 * }
 *
 */
export const transformDataToRows = (data: DataType | null | undefined, t: (key: string) => string) => {
  return data
    ? Object.entries(data).map(([key, value]) => ({
        label: t(key), // i18n 다국어 처리
        value,
      }))
    : []
}

export const checkContentType = (data: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(data, "text/html")
  let type = "text"
  if (doc.body.children.length > 0) return "markUp"
  try {
    JSON.parse(data)
    type = "json"
  } catch {
    type = "text"
  } finally {
    console.log("tttttttyyyyyyyyypeeeeeeeeeee", data, type)
  }
  return type
}
