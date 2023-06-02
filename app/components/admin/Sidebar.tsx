"use client";

import { setDashboardSidebarOpened } from "@/app/features/appSlice";
import { appSelector } from "@/app/redux/selector";
import {
  ArrowLeftOnRectangleIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  CircleStackIcon,
  Cog8ToothIcon,
  DocumentChartBarIcon,
  HomeModernIcon,
  ListBulletIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Logo";

const links = [
  {
    title: "Homepage",
    href: "/",
    icon: <HomeModernIcon className="w-5 h-5" />,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <ChartBarIcon className="w-5 h-5" />,
  },
  {
    title: "Posts",
    href: "/dashboard/posts",
    icon: <DocumentChartBarIcon className="w-5 h-5" />,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: <CircleStackIcon className="w-5 h-5" />,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: <BuildingStorefrontIcon className="w-5 h-5" />,
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: <ListBulletIcon className="w-5 h-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Cog8ToothIcon className="w-5 h-5" />,
  },
];

function Sidebar() {
  const { dashboardSidebarOpened } = useSelector(appSelector);
  const dispatch = useDispatch();
  const pathname = usePathname();

  return (
    <aside
      className={`bg-white text-black h-full shadow-lg md:bg-inherit md:text-white py-5 pl-5 fixed ${
        dashboardSidebarOpened ? "left-0" : "-left-full"
      } md:static top-0 z-50 transition-all rounded-r-md w-2/3 md:w-full h-screen`}
    >
      <div>
        <button
          className="btn btn-secondary p-1 w-8 h-8 absolute top-2 md:top-5 right-2 md:right-5 block md:hidden"
          onClick={() => dispatch(setDashboardSidebarOpened(false))}
        >
          <XMarkIcon />
        </button>

        <div className="flex items-center gap-x-2 mb-4">
          <Logo className="w-10 h-10" href="/dashboard" />
          <h1 className="text-3xl sm:text-4xl leading-normal md:text-white">
            Admin
          </h1>
        </div>

        <ul className="pr-4 sm:pr-16 md:pr-0 space-y-2">
          {links.map((link, index) => (
            <Link
              key={link.title + index}
              className={`flex items-center gap-x-2 px-2 py-3 rounded-md md:rounded-r-none ${
                pathname === link.href && "bg-slate-300 text-gray-700"
              } hover:bg-slate-300 md:hover:bg-white hover:text-gray-700 transition-all`}
              href={link.href}
              onClick={() => dispatch(setDashboardSidebarOpened(false))}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}

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
      </div>
    </aside>
  );
}

export default Sidebar;
