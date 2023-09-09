import {
  openDeleteCategoryModal,
  setSelectedCategory,
} from "@/app/features/appSlice";
import { fetchCategories } from "@/app/features/categorySlice";
import { AppDispatch } from "@/app/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  categories: Category[];
};

function CategoryTable({ categories }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleEdit = (category: Category) => {
    dispatch(setSelectedCategory(category));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="overflow-x-auto">
      <table className="basic">
        <thead>
          <tr>
            <th>Name</th>
            <th>Parent</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td className="min-w-[120px]">{category.title}</td>
              <td className="min-w-[120px]">{category.parent?.title}</td>
              <td className="min-w-[160px] flex flex-col gap-2">
                <button
                  className="btn grow"
                  onClick={() => handleEdit(category)}
                >
                  Edit
                </button>
                <button
                  className="btn grow"
                  onClick={() => dispatch(openDeleteCategoryModal(category))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
