"use client";

import { useSession } from "next-auth/react";
import { setEditProfileModalOpened } from "../features/appSlice";
import { useDispatch } from "react-redux";
import { PencilIcon } from "@heroicons/react/24/outline";

function EditProfileButton() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  if (!session) return null;

  return (
    <button
      className="btn btn-primary p-[6px] gap-1"
      type="button"
      onClick={() => dispatch(setEditProfileModalOpened(true))}
    >
      <span>
        <PencilIcon className="w-4 h-4" />
      </span>
      Chỉnh sửa hồ sơ
    </button>
  );
}

export default EditProfileButton;
