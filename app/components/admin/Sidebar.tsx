"use client";

import {
  ArrowLeftOnRectangleIcon,
  BoltIcon,
  ChartBarIcon,
  Cog8ToothIcon,
  DocumentChartBarIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function Sidebar() {
  return (
    <aside>
      <div className="h-full text-white py-5 pl-5">
        <div className="flex items-center gap-x-2 mb-4">
          <div className="w-10 h-10 relative">
            <Image alt="logo" src="/logo.png" fill sizes="100%" />
          </div>
          <h1 className="text-4xl leading-normal">Admin</h1>
        </div>

        <ul>
          <li>
            <Link
              className="flex items-center gap-x-2 px-2 py-3 rounded-l-md hover:bg-white hover:text-gray-700 transition-all"
              href="/dashboard/"
            >
              <ChartBarIcon className="w-5 h-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-x-2 px-2 py-3 rounded-l-md hover:bg-white hover:text-gray-700 transition-all"
              href="/dashboard/posts"
            >
              <DocumentChartBarIcon className="w-5 h-5" />
              Posts
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-x-2 px-2 py-3 rounded-l-md hover:bg-white hover:text-gray-700 transition-all"
              href="/dashboard/products/"
            >
              <ChartBarIcon className="w-5 h-5" />
              Products
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-x-2 px-2 py-3 rounded-l-md hover:bg-white hover:text-gray-700 transition-all"
              href="/dashboard/categories"
            >
              <ListBulletIcon className="w-5 h-5" />
              Categories
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-x-2 px-2 py-3 rounded-l-md hover:bg-white hover:text-gray-700 transition-all"
              href="/dashboard/settings"
            >
              <Cog8ToothIcon className="w-5 h-5" />
              Settings
            </Link>
          </li>
          <li>
            <button
              className="w-full flex items-center gap-x-2 px-2 py-3 rounded-l-md hover:bg-white hover:text-gray-700 transition-all"
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
