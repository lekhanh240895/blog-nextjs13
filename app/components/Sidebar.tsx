"use client";

import { setSidebarOpened } from "@/app/features/appSlice";
import { appSelector } from "@/app/redux/selector";
import {
  ArrowLeftOnRectangleIcon,
  BuildingStorefrontIcon,
  Cog8ToothIcon,
  HomeModernIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import SidebarCategoryMenu from "./SidebarCategoryMenu";
import { UserIcon } from "./Icons";

function Sidebar() {
  const { sidebarOpened } = useSelector(appSelector);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const links = [
    {
      title: "Homepage",
      href: "/",
      icon: <HomeModernIcon className="w-5 h-5" />,
    },
    {
      title: "Account",
      href: "/account",
      icon: <UserIcon className="w-5 h-5" />,
    },
    {
      title: "Products",
      href: "/products",
      icon: <BuildingStorefrontIcon className="w-5 h-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Cog8ToothIcon className="w-5 h-5" />,
    },
  ];

  const handleCloseSidebar = () => dispatch(setSidebarOpened(false));

  return (
    <aside
      className={`bg-gray-200 text-black h-full shadow-xl pt-10 px-4 fixed ${
        sidebarOpened ? "left-0" : "-left-full"
      } top-0 z-50 transition-all rounded-r-md w-2/3 sm:w-1/2 block md:hidden h-screen`}
    >
      <div className="relative">
        <button
          className="btn btn-secondary p-1 w-8 h-8 absolute -top-8 right-0"
          onClick={handleCloseSidebar}
        >
          <XMarkIcon />
        </button>
      </div>

      <div className="flex items-center gap-x-2 mb-4">
        <Link
          href="/"
          className="w-10 h-10 relative"
          onClick={handleCloseSidebar}
        >
          <Image alt="logo" src="/logo.png" fill sizes="100%" />
        </Link>
        <h1 className="text-2xl leading-normal">KhanhReview</h1>
      </div>

      <ul className="space-y-2">
        {links.map((link, index) => (
          <Link
            key={link.title + index}
            className={`flex items-center gap-x-2 px-2 py-3 rounded-md md:rounded-r-none ${
              pathname === link.href && "bg-slate-300 "
            } hover:bg-slate-300 transition-all`}
            href={link.href}
            onClick={handleCloseSidebar}
          >
            {link.icon}
            {link.title}
          </Link>
        ))}

        <SidebarCategoryMenu />

        <li>
          <button
            className={`w-full flex items-center gap-x-2 px-2 py-3 rounded-md md:rounded-r-none
              hover:bg-slate-300 md:hover:bg-white hover:text-gray-700 transition-all`}
            onClick={() => signOut()}
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            Sign out
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
