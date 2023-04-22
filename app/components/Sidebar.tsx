"use client";

import { setSidebarOpened } from "@/app/features/appSlice";
import { appSelector } from "@/app/redux/selector";
import {
  ArrowLeftOnRectangleIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import SidebarCategoryMenu from "./SidebarCategoryMenu";
import SidebarSettingMenu from "./SidebarSettingMenu";
import { useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

function Sidebar() {
  const { sidebarOpened } = useSelector(appSelector);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { data: session } = useSession();
  const sidebarRef = useRef<HTMLElement | null>(null);

  useOnClickOutside(sidebarRef, () => dispatch(setSidebarOpened(false)));

  const handleCloseSidebar = () => dispatch(setSidebarOpened(false));

  return (
    <aside
      className={`bg-gray-200 text-black h-full shadow-xl pt-10 px-4 fixed ${
        sidebarOpened ? "left-0" : "-left-full"
      } top-0 z-50 transition-all rounded-r-md w-2/3 sm:w-1/2 block md:hidden h-screen`}
      ref={sidebarRef}
    >
      <div className="relative">
        <span
          className="btn btn-secondary p-1 w-8 h-8 absolute -top-8 right-0 cursor-pointer"
          onClick={handleCloseSidebar}
        >
          <XMarkIcon />
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-2 mb-4">
        <Link
          href="/"
          className="w-10 h-10 relative flex-shrink-0"
          onClick={handleCloseSidebar}
        >
          <Image
            alt="logo"
            src="/logo.png"
            fill
            sizes="100%"
            className="object-cover object-center"
          />
        </Link>
        <h1 className="text-2xl leading-normal">KhanhReview</h1>
      </div>

      <ul className="space-y-2">
        <li>
          <Link
            className={`flex items-center gap-x-2 px-2 py-3 rounded-md md:rounded-r-none ${
              pathname === "/" && "bg-slate-300"
            } hover:bg-slate-300 transition-all`}
            href={"/"}
            onClick={handleCloseSidebar}
          >
            <span>
              <HomeModernIcon className="w-5 h-5" />
            </span>
            <span>Trang chủ</span>
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center gap-x-2 px-2 py-3 rounded-md md:rounded-r-none ${
              pathname === "/products" && "bg-slate-300"
            } hover:bg-slate-300 transition-all`}
            href={"/products"}
            onClick={handleCloseSidebar}
          >
            <span>
              <BuildingStorefrontIcon className="w-5 h-5" />
            </span>
            <span>Sản phẩm</span>
          </Link>
        </li>

        <SidebarCategoryMenu />

        {session && (
          <>
            <SidebarSettingMenu />

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
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
