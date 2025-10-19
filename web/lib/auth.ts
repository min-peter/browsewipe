import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./zod"
import { adapter } from "next/dist/server/web/adapter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        // This is a mock user for demonstration purposes.
        // In a real application, you would fetch the user from your database.
        const user = {
          id: "1",
          name: "John Doe",
          email: "admin@gmail.com",
          password: "12345678",
        };

        if (credentials.email === user.email && credentials.password === user.password) {
          // Return the user object without the password
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }

        return null;
      },
    }),

  ],
})