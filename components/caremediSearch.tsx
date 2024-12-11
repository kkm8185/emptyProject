import React, { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

const CareMediSearch = () => {
  const [inputValue, setInputValue] = useState("")
  const [inputHelp, setInputHelp] = useState("잘못된 형식의 이메일 주소 입니다.")
  const [visibleClaerButton, setVisibleClearButton] = useState<boolean>(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (e.target.value === "") {
      //   setInputError("입력 필드는 비워둘 수 없습니다.")
    } else {
      setInputHelp("")
    }
  }

  const handleClear = () => {
    setInputValue("")
    setInputHelp("")
  }
  const handleFocus = () => {
    setVisibleClearButton(true)
  }

  const handleBlur = () => {
    if (!inputValue) setVisibleClearButton(false)
  }

  return (
    <div className="flex flex-col ">
      <div className={cn("relative text-start")}>
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="음식 검색"
          className={cn(
            "relative pr-10 ",
            inputValue && "border-caremedi-gray-700",
            !inputValue && "focus-visible:border-caremedi-gray-500"
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <div className="flex flex-row gap-1">
            {visibleClaerButton && (
              <Button
                variant="outline"
                size="icon"
                className={cn("size-9 border-none hover:bg-transparent")}
                onClick={handleClear}
              >
                <Image
                  src="/icons/ic_delete.svg" // public 폴더의 delete icon
                  alt="초기화 아이콘"
                  width={24}
                  height={24}
                />
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              className={cn("size-9 border-none hover:bg-transparent")}
              onClick={handleClear}
            >
              <Image
                src="/icons/ic_search.svg" // public 폴더의 delete icon
                alt="검색 아이콘"
                width={24}
                height={24}
              />
            </Button>
          </div>
        </div>
        {/* 입력값이 있을 때만 초기화 버튼 표시 */}
      </div>
      {/* 오류 or 성공 메시지 */}
      {inputHelp && (
        <span className="self-start px-3 py-2 text-body5Medium text-caremedi-gray-600">{inputHelp}</span>
      )}{" "}
    </div>
  )
}

export default CareMediSearch
