import React, { useState } from "react"
import Image from "next/image"

import { cn, cnJoin } from "@/lib/utils"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

type Props = {
  title: string
}
const CareMediInput = ({ title }: Props) => {
  const [inputValue, setInputValue] = useState("")
  const [inputError, setInputError] = useState("잘못된 형식의 이메일 주2소 입니다.")
  const [inputSuccess, setInputSuccess] = useState("사용할 수 있는 이메일 주2소입니다.")
  const [inputHint, setInputHint] = useState("사용할 수 있는 힌트")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (e.target.value === "") {
      //   setInputError("입력 필드는 비워둘 수 없습니다.")
    } else {
      setInputError("")
      setInputSuccess("")
      setInputHint("")
    }
  }

  const handleClear = () => {
    setInputValue("")
    setInputError("")
  }
  return (
    <div className="flex flex-col ">
      <div className={cn("relative text-start")}>
        <Input
          type="text"
          title={title}
          value={inputValue}
          onChange={handleChange}
          placeholder="입력하세요"
          className={cn(
            "relative pr-10 ",
            inputSuccess && "border-caremedi-primary-600",
            inputError && "border-caremedi-alert-danger",
            inputValue && "border-caremedi-gray-700",
            !inputValue && "focus-visible:border-caremedi-gray-500"
          )}
        />
        {/* 오류 or 성공 메시지 */}
        <div className={cn("absolute right-2 top-1/2 -translate-y-1/2", title && "top-[65%]")}>
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
        </div>
      </div>
      {inputHint && (
        <span className={cnJoin("self-start px-3 py-2 text-body5Medium text-caremedi-gray-600", title && "!px-0")}>
          {inputHint}
        </span>
      )}
      {inputError && (
        <span className={cnJoin("self-start px-3 py-2 text-body5Medium text-caremedi-alert-danger", title && "!px-0")}>
          {inputError}
        </span>
      )}
      {inputSuccess && (
        <span className={cnJoin("self-start px-3 py-2 text-body5Medium text-caremedi-primary-600", title && "!px-0")}>
          {inputSuccess}
        </span>
      )}
    </div>
  )
}

export default CareMediInput
