import Image from "next/image";
import Link from "next/link";
import React from "react";

function Avatar({
  href,
  src,
  className = "w-20 h-20 md:w-28 md:h-28 relative flex-shrink-0",
}: {
  href?: string;
  src: string;
  className?: string;
}) {
  return (
    <>
      {href ? (
        <Link href={href} className={className}>
          <Image
            src={src}
            alt="Avatar"
            fill
            sizes="100%"
            className="rounded-full object-cover object-center"
          />
        </Link>
      ) : (
        <div className={className}>
          <Image
            src={src}
            alt="Avatar"
            fill
            sizes="100%"
            className="rounded-full object-cover object-center"
          />
        </div>
      )}
    </>
  );
}

export default Avatar;
