"use client";

import Link from "next/link";
import CategoryMenu from "./CategoryMenu";

function Navbar() {
  return (
    <nav className="items-center justify-center gap-x-4 hidden md:flex text-gray-600">
      <Link href="/" className="py-1 px-1 md:px-2 md:py-5">
        Home
      </Link>

      <CategoryMenu />

      <Link href="/contact" className="py-1 px-1 md:px-2 md:py-5">
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
