import Axios from "../axios.config"

interface IFaqListData {
  appFaqId: string // FAQ ID ( 암호화 )
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
interface IFaqList {
  totalCount: number // 총 수량
  faqs: IFaqListData[]
}
interface IFaqError {
  code: string
  message: string
  reason: string
  status: number
}
export interface IGetFaqListResponse {
  id: string
  dateTime: string
  response: IFaqList
}

interface ICategory {
  category: string
}

export interface IGetCategoryListResponse {
  id: string
  dateTime: string
  response: ICategory[]
}
/**
 * FAQ 조회 API
 *
 * @async
 * @param {string} query - page=1&size=6
 * @returns {unknown}
 */
async function getFAQs(query: string) {
  try {
    const response = await Axios.get<IGetFaqListResponse>(`faq/list${query}`)
    // await new Promise((resolve) => setTimeout(resolve, 8000)) // delay
    return response.data
  } catch (error) {
    console.error("Error fetching notice:", error)
    throw error
  }
}
/**
 * FAQ 카테고리 조회 API
 *
 * @async
 * @param {string} query - 없음
 * @returns {unknown} - ex) ["전체","배송"...]
 */
async function getFAQCategoryList() {
  try {
    const response = await Axios.get<IGetCategoryListResponse>("faq/categorys")
    const categoryListValue: string[] = ["전체"]

    response.data.response.forEach((element) => {
      categoryListValue.push(element.category)
    })
    return categoryListValue
  } catch (error) {
    console.error("Error fetching notice:", error)
    throw error
  }
}
export { getFAQs, getFAQCategoryList }
