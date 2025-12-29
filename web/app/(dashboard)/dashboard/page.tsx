import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { BrowsersList } from "./components/BrowsersList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Browsers() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;
  console.log("Dashboard page userId:", userId);
  return (
    <div>
      <BrowsersList userId={userId} />
    </div>
  );
}
