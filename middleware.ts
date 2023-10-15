import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (
      req.url.includes("/dashboard") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.redirect(
        new URL("/auth/login?message=Only admin can access this page!", req.url)
      );
    } else if (
      req.url.includes("/account") &&
      req.nextauth.token?.username !==
        req.nextUrl.pathname.replace("/account/", "")
    ) {
      return NextResponse.redirect(
        new URL("/auth/login?message=Only owner can access this page!", req.url)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*", "/cart"],
};
