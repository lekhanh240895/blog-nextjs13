"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appSelector } from "../redux/selector";
import { closeDeleteProductModal } from "../features/appSlice";
import axios from "axios";
import { AppDispatch } from "../redux/store";
import { fetchProducts } from "../features/productSlice";

export default function DeleteProduct() {
  const { deleteProductModalOpened, selectedProduct } =
    useSelector(appSelector);
  const dispatch = useDispatch<AppDispatch>();

  function handleCancel() {
    dispatch(closeDeleteProductModal());
  }

  const handleDelete = async () => {
    await axios.delete("/api/products?_id=" + selectedProduct?._id);
    handleCancel();
    dispatch(fetchProducts());
  };

  return (
    <Transition appear show={deleteProductModalOpened} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Delete {selectedProduct?.title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this product?
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-center gap-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
