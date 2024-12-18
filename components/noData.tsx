import React from "react"

type Props = {
  title: string
}
const NoData = ({ title }: Props) => {
  return (
    <div className="mt-36 text-center">
      <span className="text-body4Medium text-caremedi-base-500">{title}</span>
    </div>
  )
}

export default NoData
