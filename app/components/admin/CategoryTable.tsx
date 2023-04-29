import { openDeleteCategoryModal } from "@/app/features/appSlice";
import { fetchCategories } from "@/app/features/categorySlice";
import { AppDispatch } from "@/app/redux/store";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  categories: Category[];
  setEditedCategoryId: Dispatch<SetStateAction<string>>;
};

function CategoryTable({ categories, setEditedCategoryId }: Props) {
  const handleEdit = (category: Category) => {
    setEditedCategoryId(category._id);
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <table className="basic table-auto">
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
