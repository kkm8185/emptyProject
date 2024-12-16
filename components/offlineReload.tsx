"use client"

import React from "react"

import { Button } from "./ui/button"

const OfflineReload = () => {
  const handleOnClick = () => {
    console.log("reload")
    window.location.reload()
  }
  return (
    <div className="mt-36 flex flex-col gap-6 text-center ">
      <span className="text-body4Medium text-caremedi-base-500">
        데이터를 불러오지 못하였습니다.
        <br />
        다시 시도하여 주세요.
      </span>
      <div>
        <Button variant="outline" size="sm" onClick={handleOnClick}>
          다시 불러오기
        </Button>
      </div>
    </div>
  )
}

export default OfflineReload
