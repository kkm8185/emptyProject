"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { PlateEditor } from "@/components/editor/plate-editor"

export default function Page() {
  const [value, setValue] = useState([
    { children: [{ text: "안녕하세요" }], type: "p", id: "0rv7RqPvlF" },
    { type: "p", children: [{ text: "반갑습니다", backgroundColor: "#783F04" }], id: "ZBJj9WMPuz" },
    { type: "p", children: [{ text: "당" }, { text: "신은", bold: true }, { text: " 누구십니까" }], id: "PZLPz2VnmQ" },
    {
      type: "p",
      children: [{ text: "나는 " }, { text: "산타", underline: true }, { text: "입니다." }],
      id: "4Ot8xZWg-w",
    },
    { type: "p", children: [{ text: "배가 고파요" }], id: "IHBNnlwfSa" },
    { type: "p", children: [{ text: "퇴근", color: "#6C9EEB" }, { text: "마려워요" }], id: "-xYc7DD0on" },
    { type: "p", children: [{ text: "쉬쉬" }], id: "D9VR2qbBZu" },
    { type: "p", children: [{ text: "ㅁㄴㅇㄻㄴㅇㄹㄹ" }], id: "b0DNFyMSeJ" },
  ])

  const handleOnClick = async () => {
    console.log("value!!!!!!", value)
    console.log("value!!!!!!", JSON.stringify(value))

    toast.success("공지사항 등록 완료")
  }
  return (
    <div className="relative flex h-full flex-col px-20 pt-20">
      <div className="h-screen w-full overflow-y-hidden rounded-lg border" data-registry="plate">
        <PlateEditor value={value} setValue={setValue} />
      </div>
      <div className="sticky flex-1 self-end">
        <Button variant="default" onClick={handleOnClick}>
          send
        </Button>
      </div>
    </div>
  )
}
