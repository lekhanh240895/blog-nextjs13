import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/app/components/Icons";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";
import React from "react";

function Contact() {
  return (
    <div>
      <div className=" pb-3 mb-5 border-b flex flex-col md:flex-row justify-between gap-3">
        <h1 className="text-2xl">Thông tin liên lạc</h1>
      </div>

      <div className="p-6 divide-y divide-gray-200">
        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
          <h2 className="w-32 flex items-center gap-2 flex-wrap">
            <PhoneIcon className="w-5 h-5" />
            Số điện thoại
          </h2>
          <a href="tel:+84935737395">0935737395</a>
        </div>

        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
          <h2 className="w-32 flex items-center gap-2 flex-wrap">
            <EnvelopeIcon className="w-5 h-5" />
            Email
          </h2>
          <a href="mailto:lekhanh240895@gmail.com">lekhanh240895@gmail.com</a>
        </div>

        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
          <h2 className="w-32 flex items-center gap-2 flex-wrap">
            <FacebookIcon className="w-5 h-5" />
            Facebook
          </h2>
          <a href="https://www.facebook.com/lekhanhhhhh">Khánh Lê</a>
        </div>

        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
          <h2 className="w-32 flex items-center gap-2 flex-wrap">
            <InstagramIcon className="w-5 h-5" />
            Instagram
          </h2>
          <a href="https://www.instagram.com/khanhchristian">khanhchristian</a>
        </div>

        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
          <h2 className="w-32 flex items-center gap-2 flex-wrap">
            <GithubIcon className="w-5 h-5" />
            Githhub
          </h2>
          <a href="https://github.com/lekhanh240895">Lê Khánh</a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
