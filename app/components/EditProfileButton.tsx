"use client";

import { useSession } from "next-auth/react";
import { setEditProfileModalOpened } from "../features/appSlice";
import { useDispatch } from "react-redux";

function EditProfileButton() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  if (!session) return null;

  return (
    <button
      className="btn btn-primary py-1"
      type="button"
      onClick={() => dispatch(setEditProfileModalOpened(true))}
    >
      Chỉnh sửa hồ sơ
    </button>
  );
}

export default EditProfileButton;
