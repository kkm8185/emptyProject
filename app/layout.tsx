import type { Metadata } from "next"
import { pretendard } from "@/fonts"

import "./globals.css"

import { cn } from "@/lib/utils"
import { AppProvider } from "@/components/providers"

export const metadata: Metadata = {
  title: "CareMedi Web View ",
  description: "CareMedi Web View Project",
  icons: {
    icon: "/favicon.svg", // icon 변경
  },
}
interface LayoutProps {
  children: React.ReactNode
}
export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={cn(pretendard.variable, "min-h-[100svh] font-pretendard antialiased")}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
