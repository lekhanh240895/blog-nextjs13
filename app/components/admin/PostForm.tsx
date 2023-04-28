import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import slugify from "slugify";
import Dropzone from "react-dropzone";
import { Editor } from "./Editor";
import { uploadFileFirebase } from "@/app/services/firebaseService";
import CategorySelect from "./CategorySelect";
import Spinner from "../Spinner";

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
      setPreview(editedPost.mainImage);
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

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setFile(selectedFiles?.[0]);
  };

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const onSubmit = async (data: FormData) => {
    let mainImageUrl;

    if (file) {
      mainImageUrl = await uploadFileFirebase("images", file);
    } else {
      mainImageUrl = editedPost?.mainImage;
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
            className="py-4"
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
        <label>Main Image</label>
        <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <div>
              {preview && (
                <div className="relative w-full h-96 mb-6 shadow-lg">
                  <Image
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

              <div
                className="bg-blue-900 text-gray-300 hover:bg-blue-800 hover:text-gray-200 h-96 w-2/3 mx-auto flex flex-col items-center justify-center rounded-md cursor-pointer space-y-4"
                {...getRootProps()}
              >
                <PlusIcon className="w-14 h-1w-14 border border-gray-200 rounded-full p-3" />
                <div>Click or Drag/Drop your image here</div>
              </div>
              <input
                type="file"
                hidden
                onChange={handleSelectFile}
                accept="image/*"
                {...getInputProps()}
              />
            </div>
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
