"use client";

import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import Dropzone from "react-dropzone";
import { uploadFileFirebase } from "@/app/services/firebaseService";
import CategorySelect from "./CategorySelect";
import Spinner from "../Spinner";
import { useSelector } from "react-redux";
import { categorySelector } from "@/app/redux/selector";

type FormData = {
  title: string;
  description: string;
  category: string;
  price: number;
};

type Props = {
  editedProduct?: Product | null;
};

function ProductForm({ editedProduct }: Props) {
  const [category, setCategory] = useState("");
  const { categories } = useSelector(categorySelector);
  const [files, setFiles] = useState<File[] | null>([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();

  useEffect(() => {
    if (editedProduct) {
      setValue("title", editedProduct.title);
      setValue("description", editedProduct.description);
      setValue("price", editedProduct.price);
      if (editedProduct.category) {
        setCategory(editedProduct.category?._id);
      }
    } else {
      reset({ title: "", description: "" });
      setCategory("");
    }
  }, [editedProduct, reset, setValue]);

  console.log({ files });

  const onSubmit = async (data: FormData) => {
    const newData = {
      ...data,
      category,
    };

    if (editedProduct) {
      await axios.put("/api/products?id=" + editedProduct._id, newData);
    } else {
      await axios.post("/api/products", newData);
    }

    router.back();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label>
          Title
          <input
            type="text"
            placeholder="Enter title of product"
            {...register("title", { required: true })}
          />
        </label>
      </div>

      <div className="mb-5">
        <label>
          Description
          <textarea
            placeholder="Enter description of product"
            {...register("description")}
            className="py-4 h-32"
          />
        </label>
      </div>

      <div className="mb-5">
        <label>
          Price (in VND)
          <input
            placeholder="Enter price of product"
            {...register("description")}
            className=""
          />
        </label>
      </div>

      <div className="mb-5">
        <div className="flex items-center space-x-4">
          <label className="flex-1">
            Category
            <CategorySelect
              categories={categories}
              value={category}
              setValue={setCategory}
            />
          </label>
        </div>
      </div>

      <div className="mb-5">
        <label>Images</label>

        <Dropzone onDrop={(acceptedFiles) => setFiles(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <>
              {/* {preview && (
                <div className="relative w-full h-96 mt-4 p-4 shadow-lg">
                  <NextImage
                    src={preview}
                    alt="Main Image"
                    fill
                    className="object-cover"
                    priority
                  />

                  <button
                    className="btn absolute top-3 right-3 p-2 z-10 shadow-sm"
                    onClick={() => setPreview("")}
                    type="button"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              )} */}

              {isSubmitting ? (
                <Spinner />
              ) : (
                <div
                  className="bg-blue-900 text-gray-300 hover:bg-blue-800 hover:text-gray-200 h-96 w-2/3 mx-auto flex flex-col items-center justify-center rounded-md cursor-pointer space-y-4 my-6"
                  {...getRootProps()}
                >
                  <PlusIcon className="w-10 h-1w-10 border border-gray-200 rounded-full p-2" />
                  <div className="text-center">
                    Attach file by dragging & dropping or selecting it.
                  </div>
                </div>
              )}
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                {...getInputProps()}
              />
            </>
          )}
        </Dropzone>
      </div>

      <button
        type="submit"
        className={
          isSubmitting ? "btn btn-primary btn-disabled" : "btn btn-primary "
        }
      >
        Save
      </button>
    </form>
  );
}

export default ProductForm;
