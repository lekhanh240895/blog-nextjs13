"use client";

import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Dropzone from "react-dropzone";
import {
  handleDeleteFilesFirebase,
  uploadFileFirebase,
} from "@/app/services/firebaseService";
import CategorySelect from "./CategorySelect";
import { useDispatch, useSelector } from "react-redux";
import { categorySelector } from "@/app/redux/selector";
import { fetchProducts } from "@/app/features/productSlice";
import { AppDispatch } from "@/app/redux/store";
import PropertySelect from "./PropertySelect";
import slugify from "slugify";

type FormData = {
  title: string;
  description: string;
  category: string;
  price: number;
  slug: string;
};

type Props = {
  editedProduct?: Product | null;
};

function ProductForm({ editedProduct }: Props) {
  const [category, setCategory] = useState("");
  const [productProperties, setProductProperties] = useState<Property | null>(
    null
  );
  const [propertiesToFill, setpropertiesToFill] = useState<Property[]>([]);
  const { categories } = useSelector(categorySelector);
  const [images, setImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (editedProduct) {
      setValue("title", editedProduct.title);
      setValue("description", editedProduct.description);
      setValue("price", editedProduct.price);
      setValue("slug", editedProduct.slug);
      setImages(editedProduct.images);
      setProductProperties(editedProduct.properties);
      if (editedProduct.category) {
        setCategory(editedProduct.category?._id);
      }
    } else {
      reset({ title: "", description: "", price: undefined });
      setCategory("");
    }
  }, [editedProduct, reset, setValue]);

  useEffect(() => {
    if (categories.length > 0) {
      if (category) {
        const catInfo = categories.find(({ _id }) => _id === category);

        if (catInfo) {
          setpropertiesToFill(catInfo.properties);

          if (catInfo?.parent?._id) {
            const properties = catInfo.properties.concat(
              catInfo.parent.properties
            );
            const uniqueProperties = properties.filter(
              (property, index, self) =>
                self.findIndex((t) => t.name === property.name) === index
            );
            setpropertiesToFill(uniqueProperties);
          }
        }
      } else {
        setpropertiesToFill([]);
      }
    }
  }, [categories, category]);

  const handleAddFiles = async (files: File[]) => {
    if (files.length > 0) {
      for (const file of files) {
        const url = (await uploadFileFirebase(
          "images/products/",
          file
        )) as unknown as string;
        if (url) {
          setImages((prev) => [...prev, url]);
        }
      }
    }
  };

  const handleRemovePreview = async (image: string) => {
    await handleDeleteFilesFirebase(image);

    setImages(images.filter((img) => img !== image));
  };

  const handleSetProductProperties = (property: Property, value: string) => {
    const newProperties = {
      ...productProperties,
      [property.name.toLowerCase()]: value,
    };

    setProductProperties(newProperties);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const newData = {
        ...data,
        category,
        images,
        properties: productProperties,
      };

      if (editedProduct) {
        await axios.put("/api/products?_id=" + editedProduct._id, newData);
      } else {
        await axios.post("/api/products", newData);
        setImages([]);
      }
    } catch (error) {
      console.log(error);
    }

    router.back();
    dispatch(fetchProducts());
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
        <label className="">
          Slug
          <div className="flex space-x-4">
            <input
              placeholder="Enter slug of post"
              {...register("slug", { required: true })}
              type="text"
            />
            <button
              type="button"
              className="btn items-stretch min-w-[150px]"
              onClick={() => {
                const title = getValues("title");
                setValue(
                  "slug",
                  slugify(title, {
                    lower: true,
                    locale: "vi",
                  })
                );
              }}
            >
              Generate slug
            </button>
          </div>
        </label>
      </div>

      <div className="mb-5">
        <label>
          Price (in VND)
          <input
            placeholder="Enter price of product"
            {...register("price")}
            type="number"
          />
        </label>
      </div>

      <div className="mb-5">
        <label>Category</label>

        <CategorySelect
          categories={categories}
          value={category}
          setValue={setCategory}
        />
      </div>

      {propertiesToFill?.length > 0 &&
        propertiesToFill?.map((property, index) => (
          <div className="mb-5" key={property.name + index}>
            <label>{property.name}</label>

            <PropertySelect
              values={property.values}
              value={productProperties?.[property.name.toLowerCase()] || ""}
              setValue={(value) => handleSetProductProperties(property, value)}
            />
          </div>
        ))}

      <div className="mb-5">
        <label>Images</label>

        <Dropzone onDrop={(acceptedFiles) => handleAddFiles(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <div className="flex flex-wrap gap-4 mt-4">
              {images.length > 0 &&
                images.map((preview) => (
                  <div
                    className="relative flex-[1_0_128px] h-64 p-2 shadow-lg"
                    key={preview}
                  >
                    <Image
                      src={preview}
                      alt="Main Image"
                      fill
                      className="object-cover"
                      priority
                      sizes="100%"
                    />

                    <button
                      className="btn absolute top-3 right-3 p-2 z-10 shadow-sm"
                      type="button"
                      onClick={() => handleRemovePreview(preview)}
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}

              <div
                className="relative bg-blue-900 text-gray-300 hover:bg-blue-800 hover:text-gray-200 h-64 w-64 flex flex-col items-center justify-center rounded-md cursor-pointer gap-2"
                {...getRootProps()}
              >
                <PlusIcon className="w-6 h-6 p-1 border border-gray-200 rounded-full" />
                <div className="text-center">
                  Attach file by dragging & dropping or selecting it.
                </div>
              </div>

              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                {...getInputProps()}
              />
            </div>
          )}
        </Dropzone>
      </div>

      <button type="submit" className={"btn btn-primary "}>
        Save
      </button>
    </form>
  );
}

export default ProductForm;
