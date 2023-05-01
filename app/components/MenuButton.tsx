"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { setSidebarOpened } from "../features/appSlice";

function MenuButton() {
  const dispatch = useDispatch();
  return (
    <button
      className="inline-block md:hidden flex-shrink-0 w-9 sm:w-10 h-9 sm:h-10 p-2 text-white bg-primary rounded-full hover:-translate-y-1 transition-all shadow-md"
      onClick={() => dispatch(setSidebarOpened(true))}
    >
      <Bars3Icon />
    </button>
  );
}

export default MenuButton;
