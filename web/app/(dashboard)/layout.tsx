import "@/app/globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Browsewipe",
  description: "Safe your digital foodprint.",
};

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <div>
      <div className="w-full bg-[#1300E1] text-white rounded-full pl-4 flex gap-2 items-center min-h-10">
        <h4 className="flex-1 text-center"><Link href="/">Browsewipe</Link></h4>
        <div className="py-2 bg-white rounded-e-full flex">
          <Button variant="link" className="text-[#1300E1]"><Link href="#">{ session?.user?.name }</Link></Button>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <Button type="submit" variant="link" className="text-[#1300E1]">Logout</Button>
          </form>
        </div>
      </div>
      <main>
        {children}
      </main>
    </div>
  );
}
