"use client";

import { setDashboardSidebarOpened } from "@/app/features/appSlice";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();

  return (
    <header className="absolute top-0 left-0 w-full h-14 p-4 bg-gray-200 block md:hidden">
      <button
        className="btn btn-secondary w-8 h-8 p-1 relative block md:hidden"
        onClick={() => dispatch(setDashboardSidebarOpened(true))}
      >
        <Bars3Icon />
      </button>
    </header>
  );
}

export default Header;
