import { z } from "zod"

import Axios from "../axios.config"

export const noticeSearchParamsSchema = z.object({
  appNoticeId: z.string(),
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
})
interface INoticeListData {
  appNoticeId: string
  title: string
  category: string
  subject: string
  content: string
  createdAt: string
  updatedAt: string
  writer: string
  editor: string
  isActive: boolean
  languageType: number
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
  response: INoticeListData[]
  error?: INoticeError
}
interface Post {
  userId: number
  id: number
  title: string
  body: string
}
async function getNotices(query: string) {
  try {
    const response = await Axios.get<Post[]>(`https://jsonplaceholder.typicode.com/posts${query}`)
    console.log("🚀 ~ fetchNotices ~ response:", response)
    return response.data
  } catch (error) {
    console.error("Error fetching notice:", error)
    throw error
  }
}

export { getNotices }
