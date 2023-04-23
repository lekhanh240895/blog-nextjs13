import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import slugify from "slugify";
import { uploadFileFirebase } from "../services/firebaseService";
import Spinner from "./Spinner";
import { Editor } from "./Editor";

const toolbarOptions = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  ["link", "image", "video"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ align: [] }],
  ["clean"], // remove formatting button
];

const modules = {
  toolbar: toolbarOptions,
};

type FormData = {
  title: string;
  description: string;
  content: string;
  slug: string;
};

function PostForm() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();

  const { data: session } = useSession();

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
    if (file) {
      const mainImageUrl = await uploadFileFirebase("images", file);

      const newData = {
        ...data,
        content,
        mainImage: mainImageUrl,
        user: session?.user.id,
      };

      // Create post
      await axios.post("/api/posts", newData);

      router.push("dashboard/posts");
    }
  };

  if (isSubmitting) return <Spinner />;

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
        Main Image
        <div className="flex flex-col gap-y-4">
          {preview && (
            <div className="relative w-full h-96">
              <Image
                src={preview}
                alt="Main Image"
                fill
                className="object-cover"
              />

              <span
                className="absolute top-3 right-3 p-2 bg-blue-900 text-white hover:bg-blue-500 rounded-md cursor-pointer"
                onClick={() => setPreview("")}
              >
                <XMarkIcon className="w-5 h-5" />
              </span>
            </div>
          )}

          <label>
            <div className="bg-blue-900 text-white hover:bg-blue-500 h-32 w-32 flex items-center justify-center rounded-md cursor-pointer">
              <ArrowUpTrayIcon className="w-8 h-8" />
            </div>
            <input
              type="file"
              hidden
              onChange={handleSelectFile}
              accept="image/*"
            />
          </label>
        </div>
      </div>

      <div className="mb-5">
        <label>Content</label>
        {/* <ReactQuill
          modules={modules}
          value={content}
          onChange={setContent}
          theme="snow"
        /> */}
        <Editor value={content} onChange={setContent} />
      </div>

      <button
        type="submit"
        className={isSubmitting ? "btn btn-disabled" : "btn btn-primary"}
      >
        Save
      </button>
    </form>
  );
}

export default PostForm;
