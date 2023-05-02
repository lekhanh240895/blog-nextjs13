"use client";

import Link from "next/link";
import CategoryMenu from "./CategoryMenu";
import TopPostsMenu from "./TopPostsMenu";

function Navbar() {
  return (
    <nav className="items-center justify-center gap-x-4 hidden md:flex text-xl">
      <Link href="/" className="py-1 px-1 md:px-2 md:py-5 hover:text-primary">
        Home
      </Link>

      <TopPostsMenu />

      <CategoryMenu />

      <Link
        href="/contact"
        className="py-1 px-1 md:px-2 md:py-5 hover:text-primary"
      >
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
