// "use server"

import React from "react"

import { getPatchInfo } from "@/lib/api/patchInfo"

async function fetchData() {
  if (typeof window !== "undefined") return // 클라이언트에서 실행 방지

  const res = await getPatchInfo()
  return res
}

type Props = {
  data: any
}
const ServerDataFetch = async ({ data }: Props) => {
  // 서버 측에서 API 호출

  if (typeof window === "undefined") {
    console.log("Running on the server")
  } else {
    console.log("Running on the client")
  }
  console.log("🚀 ~ ServerDataFetch ~ data:", data)
  return (
    <div>
      <h1>Data Fetched from Server</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default ServerDataFetch
