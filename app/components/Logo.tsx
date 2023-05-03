import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" className="relative w-8 h-8 shadow-md">
      <Image
        src="/logo.png"
        alt="logo"
        fill
        sizes="100%"
        className="rounded-full object-cover"
        priority
      />
    </Link>
  );
}

export default Logo;
