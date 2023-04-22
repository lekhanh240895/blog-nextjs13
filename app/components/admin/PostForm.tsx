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
import { useDispatch, useSelector } from "react-redux";
import { uploadFileFirebase } from "@/app/services/firebaseService";
import { categorySelector, userSelector } from "@/app/redux/selector";
import { AppDispatch } from "@/app/redux/store";
import { fetchUsers } from "@/app/features/userSlice";
import { fetchCategories } from "@/app/features/categorySlice";
import CategorySelect from "./CategorySelect";
import Spinner from "../Spinner";
import UserSelect from "./UserSelect";
import dynamic from "next/dynamic";
import { fetchPosts } from "@/app/features/postSlice";

type FormData = {
  title: string;
  description: string;
  content: string;
  slug: string;
  category: string[];
  readTime: number;
};

type Props = {
  editedPost?: Post | null;
};

const DynamicEditor = dynamic(() => import("./Editor"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

function PostForm({ editedPost }: Props) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const { users } = useSelector(userSelector);
  const { categories } = useSelector(categorySelector);
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
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (editedPost) {
      setValue("title", editedPost.title);
      setValue("description", editedPost.description);
      setValue("slug", editedPost.slug);
      setValue("readTime", editedPost.readTime);
      setAuthor(editedPost.user._id);
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
      user: author || session?.user._id,
      category,
    };

    if (editedPost) {
      await axios.put("/api/posts?_id=" + editedPost._id, newData);
    } else {
      await axios.post("/api/posts", newData);
      setPreview("");
    }
    router.back();
    dispatch(fetchPosts());
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

      <div className="flex flex-col md:flex-row mb-5 gap-5 md:gap-10 items-center justify-between">
        <div className="flex-1 w-full">
          <label>Category</label>
          <CategorySelect
            categories={categories}
            value={category}
            setValue={setCategory}
          />
        </div>

        <div className="flex-1 w-full">
          <label>Author</label>
          <UserSelect values={users} value={author} setValue={setAuthor} />
        </div>

        <div className="flex-1 w-full">
          <label>Read Time (Minute)</label>
          <input
            placeholder="Enter time to read the post"
            {...register("readTime", { required: true })}
            type="number"
          />
        </div>
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
        <DynamicEditor value={content} onChange={setContent} />
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
