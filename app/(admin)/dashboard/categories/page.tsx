"use client";

import CategoryForm from "@/app/components/admin/CategoryForm";
import CategoryTable from "@/app/components/admin/CategoryTable";
import { categorySelector } from "@/app/redux/selector";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Categories() {
  const { categories } = useSelector(categorySelector);
  const [editedCategoryId, setEditedCategoryId] = useState<string>("");
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);
  const [createCategoryOpened, setCreateCategoryOpened] =
    useState<boolean>(false);

  const handleBack = () => {
    setEditedCategoryId("");
    setCreateCategoryOpened(false);
  };

  useEffect(() => {
    if (editedCategoryId) {
      const cat = categories.find(
        (category) => category._id === editedCategoryId
      );
      if (cat) {
        setEditedCategory(cat);
      }
    } else {
      setEditedCategory(null);
    }
  }, [categories, editedCategory, editedCategoryId]);

  return (
    <section>
      {(editedCategory || createCategoryOpened) && (
        <>
          <h2 className="text-3xl mb-4 md:mr-6">
            {editedCategory
              ? `Edit category - ${editedCategory.title}`
              : "Create new category"}
          </h2>

          <button
            className="btn absolute top-4 right-4 md:top-8 md:right-8 h-8 flex items-center justify-between p-1 gap-x-1"
            onClick={handleBack}
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>Back</span>
          </button>

          <CategoryForm
            categories={categories}
            editedCategory={editedCategory}
          />
        </>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h2 className="text-3xl uppercase mb-4">Categories</h2>

        {!editedCategoryId && (
          <button
            className="btn btn-primary inline-block mb-4"
            onClick={() => setCreateCategoryOpened(true)}
          >
            Create new category
          </button>
        )}
      </div>

      <CategoryTable
        categories={categories}
        setEditedCategoryId={setEditedCategoryId}
      />
    </section>
  );
}
