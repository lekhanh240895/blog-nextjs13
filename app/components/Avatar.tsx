import Image from "next/image";
import Link from "next/link";
import React from "react";

function Avatar({ href, src, ...props }: { href: string; src: string }) {
  return (
    <Link
      href={href}
      {...props}
      className="w-20 h-20 md:w-28 md:h-28 relative flex-shrink-0"
    >
      <Image
        src={src}
        alt="Avatar"
        fill
        sizes="100%"
        className="rounded-full object-cover object-center"
      />
    </Link>
  );
}

export default Avatar;
