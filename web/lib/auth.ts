import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./zod"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client, { getUserFromDb } from "./db";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
          const user = getUserFromDb({email, password});

          if (!user) {
            throw new Error("Invaid credentials")
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token}) => {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token}) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt",
  },
})