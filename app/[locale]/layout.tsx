import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { pretendard } from "@/fonts"
import { routing } from "@/i18n/routing"
import { NextIntlClientProvider } from "next-intl"

import { cn, getMessages } from "@/lib/utils"
import { AppProvider } from "@/components/providers"

interface LayoutProps {
  children: React.ReactNode
  params: { locale: string }
}
type Locale = "ko" | "en"

export default async function RootLayout({ children, params }: LayoutProps) {
  const isValidLocale = (locale: string): locale is Locale => {
    return routing.locales.includes(locale as Locale)
  }
  if (!isValidLocale(params.locale)) {
    notFound()
  }
  const messages = await getMessages(params.locale)
  return (
    <NextIntlClientProvider messages={messages} locale={params.locale}>
      <AppProvider>{children}</AppProvider>
    </NextIntlClientProvider>
  )
}
