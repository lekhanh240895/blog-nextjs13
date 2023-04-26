import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CategorySelect from "./CategorySelect";

type FormData = {
  title: string;
  description: string;
};

type Props = {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  editedCategory: Category | null;
  fetchCategories: () => Promise<void>;
};

export default function CategoryForm({
  categories,
  editedCategory,
  fetchCategories,
}: Props) {
  const [parent, setParent] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();

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

  const onSubmit = async (data: FormData) => {
    const formData = { ...data, parent };

    if (editedCategory) {
      await axios.put("/api/categories?id=" + editedCategory._id, formData);
    } else {
      await axios.post("/api/categories", formData);
    }
    reset({ title: "", description: "" });
    setParent("");
    fetchCategories();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5 flex space-x-2 items-end">
        <label className="flex-1 mb-0">
          Title
          <input
            placeholder="Enter title of category"
            {...register("title", { required: true })}
          />
        </label>

        <label className="flex-1 mb-0">
          Description
          <input
            placeholder="Enter description of category"
            {...register("description")}
          />
        </label>

        <label className="flex-1 mb-0">
          Parent
          <CategorySelect
            value={parent}
            setValue={setParent}
            categories={categories}
          />
        </label>

        <button className="btn inline-block items-stretch h-9" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
