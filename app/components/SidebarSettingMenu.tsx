import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import {
  ChevronDownIcon,
  Cog8ToothIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSidebarOpened } from "../features/appSlice";

export default function SidebarSettingMenu() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const dispatch = useDispatch();

  return (
    <Menu
      as="li"
      className="relative flex items-center gap-x-2 px-2 py-3 rounded-md md:rounded-r-none hover:bg-slate-300 transition-all"
    >
      {({ open }) => (
        <>
          <Menu.Button>
            <div className="group transition-all flex gap-x-1 items-center">
              <Cog8ToothIcon className="w-5 h-5" />

              <span className="">Cài đặt</span>

              <ChevronDownIcon
                className={`w-4 h-4 inline-block transition-all ${
                  open ? "-rotate-90" : ""
                }`}
              />
            </div>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 -translate-x-5"
            enterTo="transform opacity-100 translate-x-0"
            leave="transition ease-in duration-300"
            leaveFrom="transform opacity-100 translate-x-0"
            leaveTo="transform opacity-0 -translate-x-5"
          >
            <Menu.Items className="absolute left-[150px] top-0 mt-2 w-40 divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={"/account" + session?.user.username}
                      className={`${
                        pathname.includes("/account")
                          ? "bg-slate-300"
                          : "text-gray-900"
                      } flex w-full items-center rounded-md px-2 py-2 transition-all`}
                      onClick={() => {
                        dispatch(setSidebarOpened(false));
                      }}
                    >
                      <UserIcon className="w-5 h-5 mr-2" />
                      Tài khoản
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
