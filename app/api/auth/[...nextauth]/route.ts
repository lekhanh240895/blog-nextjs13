import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import bcrypt from "bcrypt";
import { mongooseConnect } from "@/app/lib/mongoose";

const authOptions: NextAuthOptions = {
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
  // adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }

      if (trigger === "update" && session?.user.username) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.username = session?.user.username;
      }
      return token;
    },
    async session({ session, token, user, trigger, newSession }) {
      if (token) {
        session.user._id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
      }

      const sessionUser = await User.findOne({
        email: session.user.email,
      }).select("-password");

      session.user = sessionUser;
      token.role = sessionUser.role;

      // if (trigger === "update" && newSession?.user.username) {
      //   // You can update the session in the database if it's not already updated.
      //   // await adapter.updateUser(session.user.id, { name: newSession.name })

      //   // Make sure the updated value is reflected on the client
      //   session.user.username = newSession.user.username;
      // }

      return session;
    },
    async signIn({ profile }) {
      if (profile) {
        try {
          await mongooseConnect();

          const userExists = await User.findOne({ email: profile?.email });

          if (!userExists) {
            const user = await User.create({
              email: profile?.email,
              name: profile?.name,
              image: profile?.image,
            });
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
