"use client";

import { setSidebarOpened } from "@/app/features/appSlice";
import { appSelector } from "@/app/redux/selector";
import {
  ArrowLeftOnRectangleIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  Cog8ToothIcon,
  DocumentChartBarIcon,
  ListBulletIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

function Sidebar() {
  const { sidebarOpened } = useSelector(appSelector);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const links = [
    {
      title: "Homepage",
      href: "/",
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
    {
      title: "Category",
      href: "/category",
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
  ];

  return (
    <aside
      className={`bg-gray-200 text-black h-full shadow-xl pt-10 px-4 absolute ${
        sidebarOpened ? "left-0" : "-left-full"
      } top-0 z-50 transition-all rounded-r-md w-2/3 block md:hidden`}
    >
      <div className="relative">
        <button
          className="btn btn-secondary p-1 w-8 h-8 absolute -top-8 right-0"
          onClick={() => dispatch(setSidebarOpened(false))}
        >
          <XMarkIcon />
        </button>

        <div className="flex items-center gap-x-2 mb-4">
          <div className="w-10 h-10 relative">
            <Image alt="logo" src="/logo.png" fill sizes="100%" />
          </div>
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
              onClick={() => dispatch(setSidebarOpened(false))}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
