import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AxiosRequestConfig, Method } from "axios"

import { infoLog } from "@/lib/utils"

type Props = {
  type: "Request" | "Response"
  url: string | undefined
  location?: string
  method?: Method | string
  headers?: AxiosRequestConfig["headers"]
  status?: number
  data?: object
}

export const apiLoggerMiddleware = ({ type, url, location, method, headers, status, data }: Props) => {
  if (type === "Request") {
    console.group(`Http ${type} / method:${method}`)
    infoLog("url : ", url)
    infoLog("location : ", location)
    infoLog("headers : ", headers)
    infoLog("data : ", data)
  } else {
    console.group(`Http ${type} / method:${method} status:${status}`)
    infoLog("url : ", url)
    infoLog("location : ", location)
    infoLog("data : ", data)
  }
  console.groupEnd()
}
