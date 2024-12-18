import { Metadata } from "next"
import { SearchParams } from "@/types"

import { getMessages } from "@/lib/utils"

import PatchInfoContent from "./patchInfoContent"

/** 해당 페이지의 메타 데이터 등록 */
export const metadata: Metadata = {
  title: "CareMedi Patch Information",
  description: "CareMedi Web View Patch Information",
}
type Props = {
  searchParams: SearchParams
  params: { locale: string }
}
/**
 * 패치 정보 페이지
 * @param searchParams - URL 뒤에 나오는 파라미터
 * @param params - locale값을 위한 파라미터 ( ko-한글 , en-영문)
 * @returns
 */
const Page = async ({ searchParams, params }: Props) => {
  const messages = await getMessages(params.locale) // 서버 - 다국어 Object Load ( useTransition은 client에서만 사용 가능 )

  return (
    <div className="relative flex h-full min-h-screen flex-col gap-4">
      <div className="sticky z-10 py-4 text-center">
        <h1 className="text-h5Regular text-caremedi-gray-1000">{messages.patchInfo}</h1>
      </div>
      <PatchInfoContent searchParams={searchParams} locale={params.locale} />
    </div>
  )
}

export default Page
