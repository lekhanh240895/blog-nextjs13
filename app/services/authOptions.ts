import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";
import { logger } from "@/app/services/logger";
import User from "@/app/models/User";
import bcrypt from "bcrypt";

const adminEmails = ["lekhanh240895@gmail.com"];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, username, password } = credentials as {
          email: string;
          username: string;
          password: string;
        };

        const user = await User.findOne({
          $or: [{ email }, { username }],
        });

        if (!user) {
          return null;
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      // if (!adminEmails.includes(session.user.email)) {
      //   throw new Error("Only admin can access this page!");
      // }

      if (token) {
        session.user._id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  logger: {
    error(code, metadata) {
      logger.error(code, metadata);
    },
    warn(code) {
      logger.warn(code);
    },
    debug(code, metadata) {
      logger.debug(code, metadata);
    },
  },
};
