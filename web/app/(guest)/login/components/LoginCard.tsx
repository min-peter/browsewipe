"use client"
import { loginUser } from "@/app/actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react"

export function LoginCard() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setErrorMessage(null);
    const result = await loginUser(formData);
    if (result && !result.success) {
      setErrorMessage(result.message);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={handleSubmit}
          id="login_form"
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" id="email" type="email" placeholder="Enter email" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input name="password" id="password" type="password" placeholder="Enter password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {errorMessage && (
          <p className="text-sm font-medium text-red-500">{errorMessage}</p>
        )}
        <Button type="submit" className="w-full" form="login_form">
          Login
        </Button>
        {/* <hr className="my-4 border border-1 border-gray-100 w-full" />
        <div className="w-full">
          <SignIn />
        </div> */}
      </CardFooter>
    </Card>
  )
}
