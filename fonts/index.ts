import localFont from "next/font/local"

export const pretendard = localFont({
  src: [
    {
      path: "./Pretendard-ExtraBold.subset.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
})
