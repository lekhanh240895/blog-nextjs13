import {
  openDeleteCategoryModal,
  setSelectedCategory,
} from "@/app/features/appSlice";
import { fetchCategories } from "@/app/features/categorySlice";
import { AppDispatch } from "@/app/redux/store";
import React, { Dispatch, SetStateAction, useEffect } from "react";
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
            <td>{category.title}</td>
            <td>{category.parent?.title}</td>
            <td className="space-y-1 space-x-1">
              <button className="btn grow" onClick={() => handleEdit(category)}>
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
  );
}

export default CategoryTable;
