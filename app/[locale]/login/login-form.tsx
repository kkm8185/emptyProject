"use client"

import * as React from "react"
// import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { delay } from "@toss/utils"
import { LockKeyhole, Mail } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next-nprogress-bar"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MiniLoader from "@/components/icons/mini-loader"

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email address is required.",
    })
    .email("Invalid email address."),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberPass: z.boolean().default(false).optional(),
})

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberPass: false,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)

    try {
      const res = await signIn("web-view-credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      await delay(500) //show loader max 1s

      if (res?.error) {
        form.setError("email", { type: "custom", message: res?.error }, { shouldFocus: true })
        throw new Error(res?.error)
      }

      // router.refresh()
      router.push(callbackUrl)
    } catch (error: unknown) {
      setIsLoading(false)
      console.error("LOGIN ERROR >>> ", error)
    }
  }

  function onClickForgotPass() {
    toast.info("Please contact reset your password.")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute inset-y-0 my-auto ml-4 size-4 text-gray-400" />
                    <Input
                      placeholder="admin@caremedi.com"
                      {...field}
                      className="pl-10 text-sm @2xs:text-base md:text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute inset-y-0 my-auto ml-4 size-4 text-gray-400" />
                    <Input
                      placeholder="• • • • • • • • • • "
                      {...field}
                      type="password"
                      className="pl-10 text-sm @2xs:text-base md:text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between text-foreground">
          <FormField
            control={form.control}
            name="rememberPass"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="rounded-[4px]" />
                </FormControl>
                <FormLabel className="">Keep me logged in</FormLabel>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="link"
            className="h-4 px-0 text-sm text-gray-500 underline underline-offset-2"
            onClick={onClickForgotPass}
          >
            Forgot password?
          </Button>
        </div>
        <Button type="submit" className="bg-caremedi-primary hover:bg-caremedi-primary/90 w-full" disabled={isLoading}>
          <MiniLoader
            className={cn("hidden text-primary-foreground", {
              block: isLoading,
            })}
          />{" "}
          Submit
        </Button>
      </form>
    </Form>
  )
}
