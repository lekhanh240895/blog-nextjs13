"use client";

import React, { useEffect, useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Quill from "quill";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const CustomComponent = () => (
  <div id="toolbar">
    <select className="ql-font ql-picker" defaultValue="">
      <option value="" />
      <option value="serif" />
      <option value="monospace" />
    </select>
    <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
      <option value=""></option>
    </select>
    <select className="ql-align" />
    <button className="ql-direction" />
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-strike"></button>
    <select className="ql-color" />
    <select className="ql-background" />
    <button className="ql-script" value="super" />
    <button className="ql-script" value="sub" />
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <button className="ql-blockquote" />
    <button className="ql-code-block" />
    <button className="ql-indent" value="-1"></button>
    <button className="ql-indent" value="+1"></button>
    <button className="ql-link" />
    <button className="ql-image" />
    <button className="ql-video" />
    <button className="ql-imgUrl">
      <PlusCircleIcon className="w-[18px] h-[18px]" />
    </button>
    <button className="ql-clean" />
  </div>
);

const Editor = ({ value, onChange }: any) => {
  const quillRef = useRef<Quill | null>(null);
  const reactQuillRef = useRef<ReactQuill | null>(null);

  const attachQuillRefs = () => {
    if (reactQuillRef.current) {
      if (typeof reactQuillRef.current.getEditor !== "function") return;
      quillRef.current = reactQuillRef.current.getEditor() as unknown as Quill;
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

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        handlers: {
          imgUrl: imageUrlHandler,
        },
      },
    };
  }, []);

  return (
    <div className="text-editor mt-4">
      <CustomComponent />
      <ReactQuill
        ref={(el) => {
          reactQuillRef.current = el;
        }}
        theme="snow"
        onChange={onChange}
        modules={modules}
        value={value}
      />
    </div>
  );
};

export default Editor;
