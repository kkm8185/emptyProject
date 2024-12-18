"use client"

import React, { useEffect, useState } from "react"
import { SearchParams } from "@/types"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

import { getPatchInfo } from "@/lib/api/patchInfo"
import { transformDataToRows } from "@/lib/utils"

import PatchInfoRowItem from "./patchInfoRowItem"

interface Item {
  label: string
  value: string
}
type Props = {
  searchParams: SearchParams
}
const PatchInfoData = ({ searchParams }: Props) => {
  const t = useTranslations()
  const { data } = useSuspenseQuery({
    queryKey: ["PatchInfo"], // 쿼리 키
    queryFn: async () => {
      /** 카테고리 리스트 API 호출 */
      const data = getPatchInfo()
      return data
    },
  })
  const rows: Item[] = transformDataToRows(data, t)

  return (
    <div className="flex flex-col ">
      {rows.map((row, index) => (
        <PatchInfoRowItem
          key={index}
          isLoading={false}
          label={row.label}
          value={row.value}
          isLast={index === rows.length - 1}
        />
      ))}
    </div>
  )
}

export default PatchInfoData
