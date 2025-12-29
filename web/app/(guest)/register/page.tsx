import { Button } from "@/components/ui/button";
import { RegisterCard } from "./components/RegisterCard";
import Link from "next/link";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }

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