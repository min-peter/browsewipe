import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signIn } from "@/lib/auth"
import { SignIn } from "./SignIn"
import { executeAction } from "@/lib/executeAction"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"

// const SIGNIN_ERROR_URL = "/error"

export function LoginCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link href="/register" ><Button variant="link">Register</Button></Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            "use server"
            await executeAction({
              actionFn: async () => {
                try {
                  await signIn("credentials", formData);
                } catch (error) {
                  // if (error instanceof AuthError) {
                  //   return redirect(`?error=${error.message}`)
                  // }
                  throw error;
                }
              },
            })
          }}
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
        <Button type="submit" className="w-full" form="login_form">
          Login
        </Button>
        <hr className="my-4 border border-1 border-gray-100 w-full" />
        <div className="w-full">
          <SignIn />
        </div>
      </CardFooter>
    </Card>
  )
}
