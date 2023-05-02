"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { setSidebarOpened } from "../features/appSlice";

function MenuButton() {
  const dispatch = useDispatch();
  return (
    <button
      className="inline-block md:hidden flex-shrink-0  text-white bg-primary rounded-full hover:-translate-y-1 transition-all shadow-md"
      onClick={() => dispatch(setSidebarOpened(true))}
    >
      <Bars3Icon className="w-9 h-9 p-2 sm:h-10 sm:w-10" />
    </button>
  );
}

export default MenuButton;
