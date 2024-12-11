import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CareMedi Notice",
  description: "CareMedi Web View Notice",
}
interface LayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {
  return <>{children}</>
}
