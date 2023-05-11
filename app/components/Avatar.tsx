import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  href?: string;
  src: string;
  alt?: string;
  [key: string]: any;
}

function Avatar({
  href,
  src,
  alt = "Avatar",
  className = "relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0",
  ...props
}: Props) {
  let Component: any;

  if (href) {
    Component = Link;
    props.href = href;
  } else {
    Component = "div";
  }

  return (
    <Component
      className={`${className} relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0`}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100%"
        className="rounded-full object-cover object-center"
      />
    </Component>
  );
}

export default Avatar;
