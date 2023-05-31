"use client";

import CategoryForm from "@/app/components/admin/CategoryForm";
import CategoryTable from "@/app/components/admin/CategoryTable";
import { setSelectedCategory } from "@/app/features/appSlice";
import { appSelector, categorySelector } from "@/app/redux/selector";
import { AppDispatch } from "@/app/redux/store";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryBody() {
  const { categories } = useSelector(categorySelector);
  const { selectedCategory } = useSelector(appSelector);
  const [createCategoryOpened, setCreateCategoryOpened] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleBack = () => {
    dispatch(setSelectedCategory(null));
    setCreateCategoryOpened(false);
  };

  return (
    <section>
      {(selectedCategory || createCategoryOpened) && (
        <>
          <h2 className="text-3xl mb-4 md:mr-6">
            {selectedCategory
              ? `Edit category - ${selectedCategory.title}`
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
            editedCategory={selectedCategory}
          />
        </>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h2 className="text-3xl uppercase mb-4">Categories</h2>

        {!selectedCategory && (
          <button
            className="btn btn-primary inline-block mb-4"
            onClick={() => setCreateCategoryOpened(true)}
          >
            Create new category
          </button>
        )}
      </div>

      <CategoryTable categories={categories} />
    </section>
  );
}
