"use client"

import React, { useEffect, useState } from "react"
import { SearchParams } from "@/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

import { getPermissionInfo } from "@/lib/api/permissionInfo"
import { transformDataToRows } from "@/lib/utils"

import PermissionInfoRowItem from "./permissionInfoRowItem"

interface Item {
  label: string
  value: string
}
type Props = {
  searchParams: SearchParams
}
const PermissionInfoData = ({ searchParams }: Props) => {
  const t = useTranslations() // next-intl의 useTranslations 훅 사용
  const { data } = useSuspenseQuery({
    queryKey: ["PermissionInfo"], // 쿼리 키
    queryFn: async () => {
      /** 카테고리 리스트 API 호출 */
      const data = getPermissionInfo()
      return data
    },
  })
  const rows: Item[] = transformDataToRows(data, t)

  return (
    <div className="mx-3 flex flex-col gap-4 pb-10">
      {rows.map((row, index) => (
        <PermissionInfoRowItem key={index} isLoading={false} label={row.label} value={row.value} />
      ))}
    </div>
  )
}

export default PermissionInfoData
