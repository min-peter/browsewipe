import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Browsewipe",
  description: "Safe your digital foodprint",
};

export default async function GuestLayout({ children }) {
  const session = await auth();
  if (session?.user) redirect('/dashboard');

  return (
    <div>
      <div className="w-full bg-[#1300E1] text-white rounded-full pl-4 flex gap-2 items-center min-h-10">
        <h4 className="flex-1 text-center"><Link href="/">Browsewipe Registeration</Link></h4>
        <div className="py-2 bg-white rounded-e-full">
          <Button variant="link" className="text-[#1300E1]"><Link href="#">Download</Link></Button>
          <Button variant="link" className="text-[#1300E1]"><Link href="/login">Login</Link></Button>
        </div>
      </div>
      <main className="py-5 md:py-20">
        {children}
      </main>
    </div>
  );
}
