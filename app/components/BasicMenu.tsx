"use client";

import { Menu, Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { Fragment, useState } from "react";

interface Item {
  title: string;
  slug?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  children?: any;
}

interface Props {
  items: Item[];
  children: React.ReactNode;
  rotateIconDown?: boolean;
  itemPreHref?: string;
  offset?: [number, number];
}

export default function BasicMenu({
  items,
  children,
  rotateIconDown,
  itemPreHref,
  offset = [0, 0],
}: Props) {
  const [history, setHistory] = useState<
    {
      title?: string;
      data: Item[];
    }[]
  >([{ data: items }]);
  const current = history[history.length - 1];

  const handleBack = () => {
    setHistory((prevState) => prevState.slice(0, history.length - 1));
  };

  return (
    <Menu as="div" className="relative text-left flex transition-all">
      {({ open }) => (
        <>
          <Menu.Button>
            {rotateIconDown ? (
              <div className="group transition-all flex gap-x-1 items-center">
                {children}

                <ChevronUpIcon
                  className={`w-3 h-3 inline-block transition-all group-hover:text-primary ${
                    open ? "" : "rotate-180"
                  }`}
                />
              </div>
            ) : (
              children
            )}
          </Menu.Button>

          <Transition
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 -translate-y-3"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition ease-in duration-300"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 -translate-y-3"
            as={Fragment}
          >
            <Menu.Items
              className={`absolute z-50 right-0 top-full mt-2 duration w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[350px] overflow-scroll`}
              as="ul"
            >
              {history.length > 1 && (
                <div className="flex w-full items-center rounded-md px-2 py-2 transition-all gap-2">
                  <button className="" onClick={handleBack}>
                    <ChevronLeftIcon width={24} height={24} />
                  </button>
                  <h4 className="">{current.title}</h4>
                </div>
              )}

              {current.data.map((item, index) => {
                const isParent = item.children;

                return (
                  <div className="p-1" key={item.title + index}>
                    <Menu.Item as="li">
                      {({ active }) =>
                        item.slug ? (
                          <Link
                            href={
                              itemPreHref
                                ? `/${itemPreHref}/${item.slug}`
                                : `/${item.slug}`
                            }
                            className={`${
                              active ? "bg-primary text-white" : "text-gray-900"
                            } flex w-full items-center rounded-md px-2 py-2 transition-all gap-2`}
                          >
                            {item.icon}
                            {item.title}
                          </Link>
                        ) : (
                          <span
                            className={`${
                              active ? "bg-primary text-white" : "text-gray-900"
                            } flex w-full items-center rounded-md px-2 py-2 transition-all gap-2 cursor-pointer`}
                            onClick={(e) => {
                              if (isParent) {
                                setHistory((prev) => [...prev, item.children]);
                                e.preventDefault();
                              } else if (item.onClick) {
                                item.onClick();
                              }
                            }}
                          >
                            {item.icon}
                            {item.title}
                          </span>
                        )
                      }
                    </Menu.Item>
                  </div>
                );
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
