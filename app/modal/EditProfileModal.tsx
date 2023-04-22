"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appSelector } from "../redux/selector";
import { setEditProfileModalOpened } from "../features/appSlice";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Avatar from "../components/Avatar";
import { useForm } from "react-hook-form";
import { uploadFileFirebase } from "../services/firebaseService";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

interface FormData {
  image: string;
  username: string;
  name: string;
  description: string;
}

function EditProfileModal() {
  const { editProfileModalOpened } = useSelector(appSelector);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();
  const { data: session, update } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setValue("image", session.user.image);
      setValue("name", session.user.name);
      setValue("username", session.user.username);
      setValue("description", session.user.description);
    }
  }, [session, setValue]);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview("");
    }
  }, [file, setValue]);

  const handleClose = () => dispatch(setEditProfileModalOpened(false));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) setFile(selectedFile);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      dispatch(setEditProfileModalOpened(false));
      reset(
        {},
        {
          keepValues: true,
        }
      );
    }
  }, [isSubmitSuccessful, dispatch, reset]);

  const onSubmit = async (data: FormData) => {
    if (file) {
      data.image = (await uploadFileFirebase("images", file)) as string;
    }

    // Update user
    const res = await axios.put(`/api/users?_id=${session?.user._id}`, data);
    const updatedUser: User = await res.data;

    // Update session
    const newSession = await update({ user: updatedUser });

    toast("Cập nhật hồ sơ thành công!", {
      type: "success",
      autoClose: 2000,
    });

    router.refresh();
  };
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
          <div className="flex min-h-full items-center justify-center p-4 relative z-50 min-w-[120px]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl min-h-[500px] transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  <div className="flex flex-col">
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 md:w-10 md:h-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 absolute top-4 right-4 md:top-5 md:right-5 cursor-pointer"
                    >
                      <XMarkIcon />
                    </button>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h1 className="p-6 text-2xl border-b border-gray-200">
                        Chỉnh sửa hồ sơ
                      </h1>

                      <div className="p-6 divide-y divide-gray-200">
                        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
                          <label htmlFor="name" className="w-32">
                            Ảnh hồ sơ
                          </label>

                          <div className="flex-1 flex justify-center">
                            <div className="relative">
                              <Avatar
                                src={preview ? preview : session?.user.image}
                              />

                              <label htmlFor="image">
                                <PencilIcon className="absolute -bottom-1 right-0 w-8 h-8 bg-white border border-gray-300 rounded-full p-[6px] cursor-pointer" />
                              </label>

                              <input
                                id="image"
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
                          <label htmlFor="username" className="w-32">
                            Username
                          </label>
                          <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            {...register("username")}
                          />
                        </div>

                        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
                          <label htmlFor="name" className="w-32">
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            {...register("name")}
                          />
                        </div>

                        <div className="px-4 py-6 flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
                          <label htmlFor="description" className="w-32">
                            Mô tả bản thân
                          </label>
                          <textarea
                            id="description"
                            placeholder="Description"
                            className="h-20"
                            {...register("description")}
                          />
                        </div>
                      </div>

                      <div className="p-6 flex gap-3 justify-end">
                        <button
                          className="btn btn-primary min-w-[120px]"
                          type="submit"
                        >
                          Save
                        </button>

                        <button
                          className="btn btn-secondary min-w-[120px]"
                          type="button"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default EditProfileModal;
