import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = user.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
