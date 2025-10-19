import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "@/lib/auth"
import { Label } from "@/components/ui/label"
 
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        console.log("Data:", Object.fromEntries(formData));
        // await signIn("mailgun", formData)
      }}
      id="send_mail_form"
      className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="Enter email"
        />
      </div>
      <Button type="submit" form="send_mail_form" variant="outline" className="w-full">Signin with confirmation mail</Button>
    </form>
  )
}