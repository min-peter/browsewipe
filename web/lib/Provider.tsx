'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const queryClient = new QueryClient();

interface ProviderProps {
    children: React.ReactNode;
    session: Session | null;
}

export const Provider = ({ children, session}: ProviderProps) => {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient} >
                { children }
            </QueryClientProvider>
        </SessionProvider>
    );
}

