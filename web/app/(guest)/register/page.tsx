import { Button } from "@/components/ui/button";
import { RegisterCard } from "./components/RegisterCard";
import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-0 md:mx-auto max-w-100">
      <div className="flex justify-around mb-4">
        <Link href='/login' ><Button size="lg" variant="secondary">Login</Button></Link>
        <Button size="lg" variant="outline" >Register</Button>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <RegisterCard />
      </div>
    </div>
  )
}