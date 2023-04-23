import React, { useEffect, useMemo, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Quill from "quill";

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

const ImgUrlIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
    />
  </svg>
);

const CustomComponent = () => (
  <div id="toolbar">
    <select className="ql-font">
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
    </select>
    <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
      <option value=""></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-list"></button>
    <button className="ql-italic"></button>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option selected></option>
    </select>
    <button className="ql-imgUrl">
      <ImgUrlIcon />
    </button>
  </div>
);

export const Editor = ({ value, onChange }: any) => {
  const quillRef = useRef<Quill | null>(null);
  const reactQuillRef = useRef<ReactQuill | null>(null);

  const attachQuillRefs = () => {
    if (reactQuillRef.current) {
      if (typeof reactQuillRef.current.getEditor !== "function") return;
      quillRef.current = reactQuillRef.current.getEditor();
    }
  };

  useEffect(() => {
    attachQuillRefs();
  });

  function imageUrlHandler() {
    const quill = quillRef.current;
    if (quill) {
      var range = quill.getSelection();
      var value = prompt("What is the image URL");

      if (value && range) {
        quill.insertEmbed(range.index, "image", value, "user");
      }
    }
  }

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          imgUrl: imageUrlHandler,
        },
      },
    };
  }, []);

  return (
    <div className="text-editor">
      <CustomComponent />

      <ReactQuill
        ref={(el) => {
          reactQuillRef.current = el;
        }}
        theme="snow"
        defaultValue={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};
