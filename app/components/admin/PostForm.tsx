"use client";

import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import slugify from "slugify";
import Dropzone from "react-dropzone";
import { Editor } from "./Editor";
import { uploadFileFirebase } from "@/app/services/firebaseService";
import CategorySelect from "./CategorySelect";
import Spinner from "../Spinner";
import { getImageUrl } from "@/app/lib/getImageUrl";

type FormData = {
  title: string;
  description: string;
  content: string;
  slug: string;
  category: string[];
};

type Props = {
  editedPost?: Post | null;
};

function PostForm({ editedPost }: Props) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    })();
  }, []);

  useEffect(() => {
    if (editedPost) {
      setValue("title", editedPost.title);
      setValue("description", editedPost.description);
      setValue("slug", editedPost.slug);
      setContent(editedPost.content);
      if (editedPost.category) {
        setCategory(editedPost.category?._id);
      }
    } else {
      reset({ title: "", description: "", slug: "" });
      setContent("");
      setPreview("");
      setCategory("");
    }
  }, [editedPost, reset, setValue]);

  useEffect(() => {
    if (!file) {
      if (editedPost) {
        return setPreview(editedPost.mainImage);
      } else {
        return setPreview("");
      }
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [editedPost, file]);

  const onSubmit = async (data: FormData) => {
    let mainImageUrl;

    if (file) {
      mainImageUrl = await uploadFileFirebase("images", file);
    } else {
      mainImageUrl = preview;
    }

    const newData = {
      ...data,
      content,
      mainImage: mainImageUrl,
      user: session?.user.id,
      category,
    };

    if (editedPost) {
      await axios.put("/api/posts?id=" + editedPost._id, newData);
    } else {
      await axios.post("/api/posts", newData);
      setPreview("");
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
            placeholder="Enter title of post"
            {...register("title", { required: true })}
          />
        </label>
      </div>

      <div className="mb-5">
        <label>
          Description
          <textarea
            placeholder="Enter description of post"
            {...register("description", { required: true })}
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
        <label>Category</label>
        <CategorySelect
          categories={categories}
          value={category}
          setValue={setCategory}
        />
      </div>

      <div className="mb-5">
        <label>Main Image</label>

        <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <>
              {preview && (
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
              )}

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
              <input type="file" hidden accept="image/*" {...getInputProps()} />
            </>
          )}
        </Dropzone>
      </div>

      <div className="mb-5">
        <label>Content</label>
        <Editor value={content} onChange={setContent} />
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

export default PostForm;
