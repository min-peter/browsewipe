import { Button } from "@/components/ui/button"
import { LoginCard } from "./components/LoginCard"
import Link from "next/link"

export default function Page() {
  return (
    <div className="mx-0 md:mx-auto max-w-100">
      <div className="flex justify-around mb-4">
        <Button size="lg" variant="outline" >Login</Button>
        <Link href='/register' ><Button size="lg" variant="secondary">Register</Button></Link>
      </div>
      <LoginCard />
    </div>
  )
}