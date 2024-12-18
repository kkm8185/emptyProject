import Image from "next/image"
import Logo from "@/public/next.svg"

import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <main className="relative flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#246958] to-[#1C302B] @container">
      <div className="flex min-w-[310px] flex-col gap-2 rounded-md bg-white p-4 shadow-lg transition-all duration-300 ease-in-out @2xs:w-[350px] @2xs:gap-6 @2xs:p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8">
            <Image src={Logo} alt="The Next Logo" className="block h-full w-auto" />
          </div>
          <div className="flex flex-col items-center gap-1 text-foreground">
            <h3 className="text-2xl font-semibold">Login to your account</h3>
            <p className="text-base text-gray-500">Enter your credentials to login</p>
          </div>
        </div>
        <div className="border-b"></div>
        <LoginForm />
      </div>
    </main>
  )
}
