import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  categories: Category[];
  setEditedCategory: Dispatch<SetStateAction<Category | null>>;
  fetchCategories: () => Promise<void>;
};

function CategoryTable({
  categories,
  setEditedCategory,
  fetchCategories,
}: Props) {
  const handleEdit = (category: Category) => {
    setEditedCategory(category);
  };

  const handleDelete = async (id: string) => {
    await axios.delete("/api/categories?id=" + id);
    fetchCategories();
  };

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
                onClick={() => handleDelete(category._id)}
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
