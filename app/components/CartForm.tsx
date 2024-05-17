import axios from "axios";
import { useForm } from "react-hook-form";
import { appSelector } from "../redux/selector";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  email: string;
  city: string;
  postalCode: string;
  address: string;
  country: string;
};

function CartForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const { cartProductIds } = useSelector(appSelector);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const formData = { ...data, cartProductIds };
    try {
      const res = await axios.post("/api/checkout", formData);

      if (res.status === 400) {
        const { message } = res.data;

        toast(message, {
          type: "error",
          autoClose: 200,
        });
      }

      const { url } = res.data;

      if (url) {
        router.push(url);
      }
    } catch (error: any) {
      const { message } = error.response.data;
      toast(message, {
        type: "error",
        autoClose: 3000,
      });
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border border-gray-300 p-4 rounded-md shadow-md  space-y-2 min-w-[200px] max-w-[400px]">
        <h1 className="text-center text-black">Order information</h1>
        <input type="text" placeholder="Name" {...register("name")} />
        <input type="email" placeholder="Email" {...register("email")} />
        <input type="text" placeholder="City" {...register("city")} />
        <input
          type="text"
          placeholder="Postal Code"
          {...register("postalCode")}
        />
        <input
          type="text"
          placeholder="Street Address"
          {...register("address")}
        />
        <input type="text" placeholder="Country" {...register("country")} />
        <button type="submit" className="btn w-full btn-primary">
          Continue to payment
        </button>
      </div>
    </form>
  );
}

export default CartForm;
