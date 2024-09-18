/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "../../db/db";
import { Session, User } from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export interface CustomSession extends Session {
  user: {
    email: string;
    name: string;
    image: string;
    uid: string;
  };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],

  callbacks: {
    session: async ({ session, token }): Promise<CustomSession> => {
      const newSession = session as CustomSession;
      if (newSession.user && token.uid) {
        newSession.user.uid = token.uid || "";
      }
      return newSession;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },

    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  events: {
    signIn: async ({ user, account, profile }) => {
      console.log("User signed in: ", user);
    },
    signOut: async ({ token }) => {
      console.log("User signed out: ", token);
    },
  },

  debug: process.env.NODE_ENV === "development",
};
