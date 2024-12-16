import React from "react"
import { Metadata } from "next"
import { SearchParams } from "@/types"

import { getMessages } from "@/lib/utils"

import FaqTabs from "./faqTabs"

export const metadata: Metadata = {
  title: "CareMedi FAQ",
  description: "CareMedi Web View FAQ",
}
type Props = {
  searchParams: SearchParams
  params: { locale: string }
}
/**
 * FAQ 페이지
 * @param searchParams - URL 뒤에 나오는 파라미터
 * @param params - locale값을 위한 파라미터 ( ko-한글 , en-영문)
 */
const Page = async ({ searchParams, params }: Props) => {
  const messages = await getMessages(params.locale) // 서버 - 다국어 Object Load ( useTransition은 client에서만 사용 가능 )

  return (
    <div className="relative flex h-full min-h-screen flex-col gap-4 ">
      <div className="bg-white text-center">
        <h1 className="py-4 text-h5Regular text-caremedi-gray-1000">{messages.faq}</h1>
      </div>
      <div className="overflow-y-hidden">
        <FaqTabs searchParams={searchParams} locale={params.locale} />
      </div>
    </div>
  )
}

export default Page
