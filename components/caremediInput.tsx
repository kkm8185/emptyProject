"use client"

import React, { useState } from "react"
import Image from "next/image"

import { cn, cnJoin } from "@/lib/utils"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

type Props = {
  title: string
}
type MessageProps = {
  message: string
  type: "hint" | "error" | "success"
  title?: string
}
const Message = ({ message, type, title }: MessageProps) => {
  if (!message) return null

  const messageClasses = {
    hint: "text-caremedi-gray-600",
    error: "text-caremedi-alert-danger",
    success: "text-caremedi-primary-600",
  }

  return (
    <span className={cnJoin("self-start px-2 py-2 text-body5Medium", messageClasses[type], title && "!px-0")}>
      {message}
    </span>
  )
}
const CareMediInput = ({ title }: Props) => {
  const [inputValue, setInputValue] = useState("")
  const [inputMessage, setInputMessage] = useState({
    error: "잘못된 형식의 이메일 주소",
    success: "성공적인 이메일 주소",
    hint: "사용할 수 있는 힌트",
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (e.target.value === "") {
      //   setInputError("입력 필드는 비워둘 수 없습니다.")
    } else {
      setInputMessage({ ...inputMessage, error: "", success: "", hint: "" })
    }
  }

  const handleClear = () => {
    setInputMessage({ ...inputMessage, error: "", success: "", hint: "" })
    setInputValue("")
  }
  const getInputClassName = () => {
    if (inputMessage.success) return "border-caremedi-primary-600"
    if (inputMessage.error) return "border-caremedi-alert-danger"
    if (inputValue) return "border-caremedi-gray-700"
    return "focus-visible:border-caremedi-gray-500"
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
          className={cn("relative pr-10 ", getInputClassName())}
        />
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
      <Message message={inputMessage.hint} type="hint" title={title} />
      <Message message={inputMessage.error} type="error" title={title} />
      <Message message={inputMessage.success} type="success" title={title} />
    </div>
  )
}

export default CareMediInput
