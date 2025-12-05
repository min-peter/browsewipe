import { Provider } from "@/lib/Provider";
import "@/app/globals.css";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Browsewipe",
  description: "Safe your digital foodprint",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        <div className="p-5 md:p-20 min-h-screen bg-gray-200">
          <Provider session={session}>{children}</Provider>
        </div>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center bg-gray-100 py-3">
          <h6 className="text-gray-600 text-sm">@ 2025 Browsewipe</h6>
        </footer>
      </body>
    </html>
  );
}
