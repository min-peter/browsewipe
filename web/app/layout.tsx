import { getServerSession } from "next-auth/next";
import { Provider } from "@/lib/Provider";
import Link from "next/link";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import Logout from "./logout";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const metadata = {
  title: "Browsewipe",
  description: "Safe your digital foodprint",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="p-5 md:p-20 min-h-screen bg-gray-200">

            {session ? (
              <div className="w-full bg-[#1300E1] text-white rounded-full pl-4 flex gap-2 items-center min-h-10 mb-2">
                <h4 className="flex-1 text-center"><Link href="/">Browsewipe</Link></h4>
                <div className="py-2 bg-white rounded-e-full flex">
                  <Button variant="link" className="text-[#1300E1]"><Link href="/dashboard">{ session?.user?.name }</Link></Button>
                  <Logout />
                </div>
              </div>
            ) : (
              <div className="w-full bg-[#1300E1] text-white rounded-full pl-4 flex gap-2 items-center min-h-10 mb-2">
                <h4 className="flex-1 text-center"><Link href="/">Browsewipe Registeration</Link></h4>
                <div className="py-2 bg-white rounded-e-full">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="link" className="text-[#1300E1]"><Link href="#">Download</Link></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Not working yet 🥹</p>
                    </TooltipContent>
                  </Tooltip>
                  <Button variant="link" className="text-[#1300E1]"><Link href="/login">Login</Link></Button>
                </div>
              </div>
            )}
            <main>
              {children}
            </main>
          </div>
          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center bg-gray-100 py-3">
            <h6 className="text-gray-600 text-sm">@ 2025 Browsewipe</h6>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
