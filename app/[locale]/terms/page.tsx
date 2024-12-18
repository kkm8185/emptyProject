import { Metadata } from "next"
import { SearchParams } from "@/types"

import { getPatchInfo } from "@/lib/api/patchInfo"
import { getMessages } from "@/lib/utils"

import TermsContent from "./termsContent"

/** 해당 페이지의 메타 데이터 등록 */
export const metadata: Metadata = {
  title: "CareMedi Terms Of Service",
  description: "CareMedi Web View Terms Of Service",
}
type Props = {
  searchParams: SearchParams
  params: { locale: string }
}
/**
 * 이용약관 페이지
 * @param searchParams - URL 뒤에 나오는 파라미터
 * @param params - locale값을 위한 파라미터 ( ko-한글 , en-영문)
 * @returns
 */
const Page = async ({ searchParams, params }: Props) => {
  const messages = await getMessages(params.locale) // 서버 - 다국어 Object Load ( useTransition은 client에서만 사용 가능 )
  const data = await getPatchInfo()
  return (
    <div className="relative flex h-full min-h-screen flex-col gap-4">
      <div className="sticky z-10 py-4 text-center">
        <h1 className="text-h5Regular text-caremedi-gray-1000">{messages.terms}</h1>
      </div>
      <TermsContent searchParams={searchParams} locale={params.locale} data={data} />
    </div>
  )
}

export default Page
