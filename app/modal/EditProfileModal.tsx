"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appSelector } from "../redux/selector";
import { setEditProfileModalOpened } from "../features/appSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

function EditProfileModal() {
  const { editProfileModalOpened } = useSelector(appSelector);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(setEditProfileModalOpened(false));
  const { data: session } = useSession();

  return (
    <Transition appear show={editProfileModalOpened} as={Fragment}>
      <Dialog onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md min-h-[500px] transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className="p-6 flex flex-col">
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 md:w-10 md:h-10 p-2 rounded-full bg-gray-200 absolute top-4 right-4 md:top-5 md:right-5 cursor-pointer"
                  >
                    <XMarkIcon />
                  </button>

                  <form className="flex-1">
                    <h4 className="text-2xl text-center mt-4 mb-10">
                      Chỉnh sửa hồ sơ
                    </h4>

                    <div className="mb-4 flex gap-2 items-center">
                      <label htmlFor="name" className="w-40">
                        Name:
                      </label>
                      <input id="name" type="text" placeholder="Name" />
                    </div>

                    <div className="mb-4 flex gap-2 items-center">
                      <label htmlFor="username" className="w-40">
                        Username:
                      </label>
                      <input id="username" type="text" placeholder="Username" />
                    </div>

                    <div className="mb-4 flex gap-2 items-center">
                      <label htmlFor="description" className="w-40">
                        Mô tả bản thân:
                      </label>
                      <textarea
                        id="description"
                        placeholder="Description"
                        className="h-20"
                      />
                    </div>

                    <div className="flex gap-3 justify-end">
                      <button className="btn btn-primary">Save</button>
                      <button className="btn btn-secondary">Cancel</button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default EditProfileModal;
