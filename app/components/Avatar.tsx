import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  href?: string;
  src: string;
  alt?: string;
  className?: string;
  fallback?: string;
  [key: string]: any;
}

function Avatar({
  href,
  src,
  alt = "Avatar",
  className,
  fallback: customFallback = "/avatar-placeholder.png",
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
      className={`${
        className ? className : "w-20 h-20 md:w-28 md:h-28"
      } relative flex-shrink-0`}
      {...props}
    >
      <Image
        src={src || customFallback}
        alt={alt}
        fill
        sizes="100%"
        className="rounded-full object-cover object-center"
      />
    </Component>
  );
}

export default Avatar;
