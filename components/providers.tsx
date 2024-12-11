"use client"

import * as React from "react"
import { RiArrowUpCircleFill } from "@remixicon/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppProgressBar } from "next-nprogress-bar"
import ScrollToTop from "react-scroll-to-top"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { TailwindIndicator } from "@/components/tailwindIndicator"

// import { ScrollToTop } from "@/components/shared/scroll-top"

interface Props {
  children?: React.ReactNode
}

export function AppProvider({ children }: Props) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    //Fix issue when adding progressbar in layout causes an error : deopted into client-side rendering
    <TooltipProvider>
      <AppProgressBar height="2px" color="#C09A61" options={{ showSpinner: false }} shallowRouting />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster richColors />
      <ScrollToTop
        className="!z-50 flex items-center justify-center"
        smooth
        // component={<RiArrowUpCircleFill size={30} className="text-caremedi-primary-500" />}
      />

      <TailwindIndicator />
    </TooltipProvider>
  )
}