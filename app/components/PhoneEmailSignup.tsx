import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import DateSelect from "./DateSelect";
import axios from "axios";
import { toast } from "react-toastify";
import { setLoginModalOpened } from "../features/appSlice";
import { signIn } from "next-auth/react";
import Spinner from "./Spinner";

type FormData = {
  username: string;
  email: string;
  password: string;
};

function PhoneEmailSignup() {
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [days, setDays] = useState<number[]>([]);
  const dispatch = useDispatch();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const this_year = new Date().getFullYear();
  const start_year = 1901;

  const years = Array.from(
    { length: this_year - start_year + 1 },
    (_, i) => i + start_year
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    setDays(Array.from({ length: getMonthDays(month, year) }, (_, i) => i + 1));
  }, [month, year]);

  const getMonthDays = (month: number, year: number) => {
    const months30 = [4, 6, 9, 11];
    const leapYear = year % 4 === 0;
    return month === 2
      ? leapYear
        ? 29
        : 28
      : months30.includes(month)
      ? 30
      : 31;
  };

  const formatDate = (year: number, month: number, day: number) => {
    const m = month < 10 ? `0${month}` : month;
    const d = day < 10 ? `0${day}` : day;
    return `${year}${m}${d}`;
  };

  const onSubmit = async (data: FormData) => {
    const formData = {
      ...data,
      birthday: formatDate(year, month, day),
    };

    try {
      await axios.post("/api/users", formData);

      await signIn("credentials", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      toast("Đăng ký thành công!", {
        type: "success",
        autoClose: 2000,
      });

      dispatch(setLoginModalOpened(false));
    } catch (error: any) {
      toast("Đăng ký không thành công!", {
        type: "error",
      });
    }
  };

  return (
    <div>
      {isSubmitting && <Spinner />}
      <p className="text-left">When&apos;s your birthday?</p>

      <div className="flex flex-wrap gap-3">
        <div className="flex-[1_0_120px]">
          <DateSelect
            values={months}
            value={month}
            setValue={setMonth}
            title="Month"
          />
        </div>

        <div className="flex-[1_0_120px]">
          <DateSelect values={days} value={day} setValue={setDay} title="Day" />
        </div>

        <div className="flex-[1_0_120px]">
          <DateSelect
            values={years.reverse()}
            value={year}
            setValue={setYear}
            title="Year"
          />
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-2 mb-4 text-left">
        Your birthday won&apos;t be shown publicly.
      </p>

      <div className="flex items-center justify-between mb-1">
        Email / Username
        <span className="text-gray-500">Sign up with phone</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            {...register("email", { required: true })}
          />

          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <Link href="/login/email/forget-password" className="block text-left">
            Forgot password?
          </Link>

          <button className="btn btn-primary w-full" type="submit">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default PhoneEmailSignup;
