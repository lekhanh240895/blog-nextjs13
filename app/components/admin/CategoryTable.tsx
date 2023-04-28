import { openDeleteCategoryModal } from "@/app/features/appSlice";
import { AppDispatch } from "@/app/redux/store";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

type Props = {
  categories: Category[];
  setEditedCategory: Dispatch<SetStateAction<Category | null>>;
};

function CategoryTable({ categories, setEditedCategory }: Props) {
  const handleEdit = (category: Category) => {
    setEditedCategory(category);
  };

  const dispatch = useDispatch<AppDispatch>();

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
