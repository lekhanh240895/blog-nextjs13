"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { setSidebarOpened } from "../features/appSlice";

function MenuButton() {
  const dispatch = useDispatch();
  return (
    <span
      className="md:hidden flex-shrink-0 icon hover:-translate-y-1"
      onClick={() => dispatch(setSidebarOpened(true))}
    >
      <Bars3Icon />
    </span>
  );
}

export default MenuButton;
