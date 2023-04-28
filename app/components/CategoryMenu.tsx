import { Menu, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { getCategories } from "../lib/getApi";

export default function CategoryMenu() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);

  const handleMouseEnter = (ev: React.MouseEvent, open: boolean) => {
    const target = ev.target as HTMLButtonElement;

    open ? "" : target.click();

    return null;
  };

  return (
    <Menu as="div" className="relative text-left z-10 inline-block">
      {({ open }) => (
        <>
          <Menu.Button onMouseEnter={(ev) => handleMouseEnter(ev, open)}>
            <div className="group transition-all flex gap-x-1 items-center">
              <span className="group-hover:text-primary transition-all">
                Categories
              </span>

              <ChevronUpIcon
                className={`w-4 h-4 inline-block transition-all ${
                  open ? "rotate-180 " : ""
                }`}
              />
            </div>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {categories.length > 0 &&
                categories.map((category) => (
                  <div className="px-1 py-1" key={category._id}>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={"/category/" + category.title.toLowerCase()}
                          className={`${
                            active ? "bg-primary text-white" : "text-gray-900"
                          } flex w-full items-center rounded-md px-2 py-2`}
                        >
                          {category.title}
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
