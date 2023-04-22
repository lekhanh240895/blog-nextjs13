import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
  href?: string;
  rounded?: boolean;
};

function Logo(props: Props) {
  const { className, href, rounded, ...rest } = props;
  return (
    <Link
      href={href ? href : "/"}
      className={`${className ? className : "w-8 h-8"} relative 
      shadow-md`}
      {...rest}
    >
      <Image
        src="/logo.png"
        alt="logo"
        fill
        sizes="100%"
        className={`object-cover object-center ${
          rounded ? "rounded-full" : ""
        }`}
        priority
      />
    </Link>
  );
}

export default Logo;
