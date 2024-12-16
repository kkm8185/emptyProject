import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { NextIntlClientProvider } from "next-intl"

import { getMessages } from "@/lib/utils"
import { AppProvider } from "@/components/providers"

type LayoutProps = {
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
  /** 다국어 설정 */
  let messages
  try {
    messages = await getMessages(params.locale)
  } catch (error) {
    console.error("Failed to load messages:", error)
    notFound()
  }
  return (
    <NextIntlClientProvider messages={messages} locale={params.locale}>
      <AppProvider>{children}</AppProvider>
    </NextIntlClientProvider>
  )
}
