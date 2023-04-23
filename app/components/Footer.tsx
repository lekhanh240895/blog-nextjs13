import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Navbar from "./Navbar";

function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center py-6 gap-y-6">
      <div className="flex gap-x-4">
        <Link href="/" className="icon">
          <FaFacebookF color="#175beb" size={18} />
        </Link>
        <Link href="/" className="icon">
          <FaTwitter color="#1da1f2" size={18} />
        </Link>
        <Link href="/" className="icon">
          <FaInstagram color="#ef00a2" size={18} />
        </Link>
      </div>

      {/* <Navbar /> */}
    </footer>
  );
}

export default Footer;
