"use client";

import axios from "axios";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import CategorySelect from "./CategorySelect";
import { useDispatch } from "react-redux";
import { fetchCategories } from "@/app/features/categorySlice";
import { AppDispatch } from "@/app/redux/store";

type FormData = {
  title: string;
  description: string;
};

type Props = {
  categories: Category[];
  editedCategory: Category | null;
};

export default function CategoryForm({ categories, editedCategory }: Props) {
  const [parent, setParent] = useState<string>("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertyName, setPropertyName] = useState("");
  const [propertyValues, setPropertyValues] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const dispatch = useDispatch<AppDispatch>();
  const watchAllValues = watch();

  useEffect(() => {
    if (editedCategory) {
      setValue("title", editedCategory.title);
      setValue("description", editedCategory.description);

      if (editedCategory.parent) {
        setParent(editedCategory.parent._id);
      } else {
        setParent("");
      }
    } else {
      reset({ title: "", description: "" });
      setParent("");
    }
  }, [editedCategory, reset, setValue]);

  const handleAddProperty = () => {
    setProperties([
      ...properties,
      { name: propertyName, values: propertyValues },
    ]);
    setPropertyName("");
    setPropertyValues("");
  };

  const handleRemoveProperty = (removeIndex: number) => {
    setProperties(properties.filter((p, pIndex) => pIndex !== removeIndex));
  };

  const onSubmit = async (data: FormData) => {
    const formData = { ...data, parent, properties };

    if (editedCategory) {
      await axios.put("/api/categories?id=" + editedCategory._id, formData);
    } else {
      await axios.post("/api/categories", formData);
    }
    reset({ title: "", description: "" });
    setParent("");
    dispatch(fetchCategories());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
      <div className="flex flex-col md:flex-row flex-wrap gap-2 md:items-end">
        <label className="flex-1 md:flex-[1_0_240px] mb-0">
          Title
          <input
            placeholder="Enter title of category"
            {...register("title", { required: true })}
          />
        </label>

        <label className="flex-1 md:flex-[1_0_240px] mb-0">
          Description
          <input
            placeholder="Enter description of category"
            {...register("description")}
          />
        </label>

        <label className="flex-1 md:flex-[1_0_240px] mb-0">
          Parent Category
          <CategorySelect
            value={parent}
            setValue={setParent}
            categories={categories}
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="flex-1 md:flex-[1_0_240px] mb-0">Properties</label>

        <div className="flex flex-wrap gap-4 mb-3">
          <input
            type="text"
            placeholder="Enter name of property"
            value={propertyName}
            onChange={(ev) => setPropertyName(ev.target.value)}
            className="flex-[1_0_128px]"
          />

          <input
            type="text"
            placeholder="Enter values of property"
            onChange={(ev) => setPropertyValues(ev.target.value)}
            value={propertyValues}
            className="flex-[1_0_128px]"
          />

          <button
            className="btn flex-[1_0_128px]"
            type="button"
            onClick={handleAddProperty}
          >
            Add property
          </button>
        </div>
      </div>

      <table className="basic table-auto mt-4">
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Values</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((property, index) => (
            <tr key={property.name + index}>
              <td>{property.name}</td>
              <td>{property.values}</td>
              <td className="space-y-1 space-x-1">
                <button
                  className="btn grow"
                  onClick={() => handleRemoveProperty(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className={`btn inline-block h-9 mt-4 ${
          watchAllValues.title ? "btn-primary" : "btn-disabled"
        }`}
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
