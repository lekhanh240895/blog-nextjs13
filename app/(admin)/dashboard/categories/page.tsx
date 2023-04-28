"use client";

import CategoryForm from "@/app/components/admin/CategoryForm";
import CategoryTable from "@/app/components/admin/CategoryTable";
import { fetchCategories } from "@/app/features/categorySlice";
import { categorySelector } from "@/app/redux/selector";
import { AppDispatch } from "@/app/redux/store";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Categories() {
  const { categories } = useSelector(categorySelector);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);
  const [createCategoryOpened, setCreateCategoryOpened] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleBack = () => {
    setEditedCategory(null);
    setCreateCategoryOpened(false);
  };
  return (
    <main>
      {(editedCategory || createCategoryOpened) && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl text-blue-900">
              {editedCategory
                ? `Edit category - ${editedCategory.title}`
                : "Create new category"}
            </h2>

            <button
              className="btn  flex items-center justify-between px-2 gap-x-1"
              onClick={handleBack}
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          <CategoryForm
            categories={categories}
            editedCategory={editedCategory}
          />
        </>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-3xl text-blue-900 uppercase mb-4">Categories</h2>

        {!editedCategory && (
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
        setEditedCategory={setEditedCategory}
      />
    </main>
  );
}
