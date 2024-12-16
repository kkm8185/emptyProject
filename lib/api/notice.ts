import { z } from "zod"

import Axios from "../axios.config"

export const noticeSearchParamsSchema = z.object({
  appNoticeId: z.string(),
  page: z.coerce.number().default(1),
  size: z.coerce.number().default(10),
})
interface INoticeListData {
  appNoticeId: string // 공지사항 ID ( 암호화 )
  category: string // 카테고리
  title: string // 제목 ( 홈페이지, 케어레보, 팔로워 등 )
  subject: string // 글 제목
  content: string // 글 내용
  createdAt: string // 등록 일자
  updatedAt: string // 수정 일자
  writer: string // 작성자
  editor: string // 수정자
  isActive: boolean // 활성화 유무 ( false - 비 활성화, true - 활성화 )
  languageType: number // 언어 ( 0 - 한국어, 1 - 영어 )
}
interface INoticeList {
  totalCount: number // 총 수량
  notices: INoticeListData[]
}
interface INoticeError {
  code: string
  message: string
  reason: string
  status: number
}
export interface IGetNoticeListResponse {
  id: string
  dateTime: string
  response: INoticeList
  error?: INoticeError
}

/**
 * 공지사항 조회 API
 *
 * @async
 * @param {string} query - page=1&size=6
 * @returns {unknown}
 */
async function getNotices(query: string) {
  try {
    const response = await Axios.get<IGetNoticeListResponse>(`/notice/list${query}`)
    return response.data
  } catch (error) {
    console.error("Error fetching notice:", error)
    throw error
  }
}

export { getNotices }
