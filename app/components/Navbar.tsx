"use client";

import Link from "next/link";
import CategoryMenu from "./CategoryMenu";
import TopPostsMenu from "./TopPostsMenu";

function Navbar() {
  return (
    <nav className="items-center justify-center gap-x-4 hidden md:flex text-xl pt-4">
      <Link href="/" className="px-1 md:px-2 hover:text-primary">
        Home
      </Link>

      <Link href="/products" className="px-1 md:px-2 hover:text-primary">
        Products
      </Link>

      <TopPostsMenu />

      <CategoryMenu />

      <Link href="/contact" className="px-1 md:px-2 hover:text-primary">
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
