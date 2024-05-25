"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    try {
      const email = e.target[0].value;
      const response = await axios.post("/api/users/forgetpass", { email });
      if (response.data.success) {
        toast(response.data.message);
        router.push("/login");
      } else throw Error(response.data.message);
    } catch (error: any) {
      toast(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center mt-36">
      <h1 className="text-orange-500 text-3xl p-3 font-bold ">
        Forgot Password
      </h1>
      <hr />
      <form className=" flex flex-col w-96" onSubmit={handleForgotPassword}>
        <input
          type="email"
          required
          placeholder="Email"
          className="p-4 m-2 rounded-lg text-slate-700"
        />
        <button
          type="submit"
          className="bg-orange-700 hover:bg-orange-500 text-white  p-3 rounded-lg m-2"
        >
          Send Email
        </button>
      </form>
    </div>
  );
}
