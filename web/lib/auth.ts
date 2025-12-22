import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./zod"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client, { getUserFromDb } from "./db";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const validated = await signInSchema.parseAsync(credentials);
          const user = await getUserFromDb({email: validated.email, password: validated.password});

          if (!user) {
            return null;
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