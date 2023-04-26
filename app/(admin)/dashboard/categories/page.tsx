"use client";

import CategoryForm from "@/app/components/CategoryForm";
import CategoryTable from "@/app/components/CategoryTable";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    const res = await axios.get("/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleBack = () => {
    setEditedCategory(null);
  };
  return (
    <main>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl text-blue-900">
          {editedCategory
            ? `Edit category - ${editedCategory.title}`
            : "Create new category"}
        </h2>
        {editedCategory && (
          <button
            className="btn btn-secondary flex items-center justify-between px-2 gap-x-1"
            onClick={handleBack}
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span>Back</span>
          </button>
        )}
      </div>

      <CategoryForm
        categories={categories}
        setCategories={setCategories}
        editedCategory={editedCategory}
        fetchCategories={fetchCategories}
      />

      <h2 className="text-3xl text-blue-900 uppercase mb-4">Categories</h2>
      <CategoryTable
        categories={categories}
        setEditedCategory={setEditedCategory}
        fetchCategories={fetchCategories}
      />
    </main>
  );
}
