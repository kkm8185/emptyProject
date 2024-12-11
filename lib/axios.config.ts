import { apiLoggerMiddleware } from "@/middleware/apiLoggerMiddleware"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

import { IS_DEV } from "./constants"

const Axios = axios.create({
  baseURL: process.env.CAREMEDI_API_URL + "/api",
  timeout: 10000,
})

Axios.interceptors.request.use(
  async <T extends AxiosRequestConfig>(config: T): Promise<T> => {
    config.headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
    if (IS_DEV) {
      apiLoggerMiddleware({
        type: "Request",
        url: config.baseURL,
        location: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data,
      })
    }

    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    const err = JSON.parse(JSON.stringify(error))
    if (IS_DEV) console.log(`Request Error`, err)
    return Promise.reject(error)
  }
)
Axios.interceptors.response.use(
  async (response: AxiosResponse): Promise<AxiosResponse> => {
    if (IS_DEV) {
      apiLoggerMiddleware({
        type: "Response",
        url: response.config.baseURL,
        location: response.config.url,
        method: response.config.method,
        status: response.status,
        data: response.data,
      })
    }

    return response
  },
  (error: AxiosError): Promise<AxiosError> => {
    const err = JSON.parse(JSON.stringify(error))
    if (IS_DEV) console.log(`Request Error`, err)
    return Promise.reject(error)
  }
)

export default Axios
