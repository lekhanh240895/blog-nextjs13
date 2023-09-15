import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      _id: string;
      role: string;
      username: string;
    } & DefaultSession["user"];
  }
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    name: string;
    image: string;
    email: string;
    bio?: string;
    description?: string;
    username: string;
    createdAt: string;
    _id: string;
    updatedAt: string;
    role: string;
  }
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {}
  /** The OAuth profile returned from your provider */
  interface Profile {}
}
