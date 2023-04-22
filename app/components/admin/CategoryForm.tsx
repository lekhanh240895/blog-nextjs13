"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CategorySelect from "./CategorySelect";
import { useDispatch } from "react-redux";
import { fetchCategories } from "@/app/features/categorySlice";
import { AppDispatch } from "@/app/redux/store";
import slugify from "slugify";
import { XMarkIcon } from "@heroicons/react/24/outline";

type FormData = {
  title: string;
  description: string;
  propertyName: string;
  propertyValues: string;
  slug: string;
  editedPropertyValues: string;
};

type Props = {
  categories: Category[];
  editedCategory: Category | null;
};

export default function CategoryForm({ categories, editedCategory }: Props) {
  const [parent, setParent] = useState<string>("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    setFocus,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const dispatch = useDispatch<AppDispatch>();
  const watchAllValues = watch();
  const allValues = getValues();

  useEffect(() => {
    if (editIndex >= 0) {
      setFocus("editedPropertyValues");
    }
  }, [editIndex, setFocus]);

  useEffect(() => {
    if (editedCategory) {
      setValue("title", editedCategory.title);
      setValue("description", editedCategory.description);
      setValue("slug", editedCategory.slug);

      if (editedCategory.properties?.length > 0) {
        setProperties(
          editedCategory.properties.map((p) => ({
            ...p,
            values: p.values.join(", "),
          }))
        );
      } else if (editedCategory.parent?.properties?.length > 0) {
        setProperties(
          editedCategory.parent.properties.map((p) => ({
            ...p,
            values: p.values.join(", "),
          }))
        );
      }
      if (editedCategory.parent) {
        setParent(editedCategory.parent._id);
      } else {
        setParent("");
      }
    } else {
      reset();
      setParent("");
      setProperties([]);
    }
  }, [editedCategory, reset, setValue]);

  const handleAddProperty = () => {
    setProperties([
      ...properties,
      {
        name: allValues.propertyName,
        values: allValues.propertyValues,
      },
    ]);
    setValue("propertyName", "");
    setValue("propertyValues", "");
  };

  const handleRemoveProperty = (removeIndex: number) => {
    setProperties(properties.filter((p, pIndex) => pIndex !== removeIndex));
  };

  const handleUpdatedProperty = async (index: number, newValues: string) => {
    const newProperties = properties.map((p, pIndex) => {
      return pIndex === index ? { ...p, values: newValues } : p;
    });
    setProperties(newProperties);
    setEditIndex(-1);
    setValue("editedPropertyValues", "");
  };

  const onSubmit = async (data: FormData) => {
    const formData = {
      ...data,
      parent,
      properties: properties.map((property) => ({
        name: property.name,
        values: property.values.includes(",")
          ? property.values.split(", ")
          : [property.values],
      })),
    };

    if (editedCategory) {
      await axios.put("/api/categories?_id=" + editedCategory._id, formData);
    } else {
      await axios.post("/api/categories", formData);
      reset({ title: "", description: "" });
      setParent("");
    }
    dispatch(fetchCategories());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
      <div className="flex flex-col md:flex-row flex-wrap gap-2 md:items-end mb-5">
        <label className="mb-0 flex-1 md:flex-[1_0_240px]">
          Title
          <input
            placeholder="Enter title of category"
            {...register("title", { required: true })}
          />
        </label>

        <div className="flex-1 md:flex-[1_0_240px]">
          <label>Parent Category (Optional)</label>
          <CategorySelect
            value={parent}
            setValue={setParent}
            categories={categories}
          />
        </div>
      </div>

      <label className="mb-5">
        Description
        <textarea
          placeholder="Enter description of post"
          {...register("description", { required: true })}
          className="py-4 h-32"
        />
      </label>

      <div className="mb-5">
        <label className="">
          Slug
          <div className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="Enter slug of post"
              {...register("slug", { required: true })}
            />
            <button
              type="button"
              className="btn items-stretch min-w-[150px]"
              onClick={() => {
                const title = allValues.title;
                setValue(
                  "slug",
                  slugify(title, {
                    lower: true,
                    locale: "vi",
                  })
                );
              }}
            >
              Generate slug
            </button>
          </div>
        </label>
      </div>

      <div className="space-y-2">
        <label className="flex-1 md:flex-[1_0_240px] mb-0">
          Properties (Optional)
        </label>

        <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-3">
          <input
            type="text"
            placeholder="Enter name of property"
            className="flex-1"
            {...register("propertyName")}
          />

          <input
            type="text"
            placeholder="Enter values of property"
            {...register("propertyValues")}
            className="flex-1"
          />

          <button
            className={`btn ${
              (!watchAllValues.propertyName ||
                !watchAllValues.propertyValues) &&
              "btn-disabled"
            } min-w-[150px]`}
            type="button"
            onClick={handleAddProperty}
          >
            Add property
          </button>
        </div>
      </div>

      {properties.length > 0 && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Values</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {properties.length > 0 &&
              properties.map((property, index) => (
                <tr key={property.name + index}>
                  <td>{property.name}</td>
                  <td>
                    {editIndex === index ? (
                      <div className="relative">
                        <input
                          type="text"
                          {...register("editedPropertyValues")}
                          className="pr-8"
                        />

                        <XMarkIcon
                          className="absolute top-1 right-1 w-5 h-5 p-1 border border-gray-300 rounded-sm cursor-pointer"
                          onClick={() => {
                            setEditIndex(-1);
                            setValue("editedPropertyValues", "");
                          }}
                        />
                      </div>
                    ) : (
                      property.values
                    )}
                  </td>
                  <td className="min-w-[160px] flex flex-col gap-2">
                    {editIndex === index ? (
                      <button
                        className="btn grow"
                        onClick={() =>
                          handleUpdatedProperty(
                            editIndex,
                            allValues.editedPropertyValues
                          )
                        }
                        type="button"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn grow"
                        onClick={() => {
                          setEditIndex(index);
                          setValue("editedPropertyValues", property.values);
                        }}
                        type="button"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      className="btn grow"
                      onClick={() => handleRemoveProperty(index)}
                      type="button"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <button
        className={`btn inline-block h-9 mt-4 ${
          allValues.title || !isSubmitting ? "btn-primary" : "btn-disabled"
        }`}
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
