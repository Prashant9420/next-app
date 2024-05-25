"use client"
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Page() {
    const router = useRouter();
    const [token , setToken] = React.useState("");
    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        if(e.target[0].value !== e.target[1].value){
            toast.error("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post("/api/users/resetpass", {token,newPassword:e.target[0].value});
            if(response.data.success){
                toast.success(response.data.message);
                router.push("/login");
            }else throw new Error(response.data.message);
        } catch (error:any) {
            toast.error(error.message);
        }
    };
    React.useEffect(() => {
        const searchQuery = window.location.search.slice(1);
        const urlToken = searchQuery.split("=")[1];
        setToken(urlToken);
    },[])
    return (
        <div className="flex flex-col items-center mt-36">
      <h1 className="text-orange-500 text-3xl p-3 font-bold ">
        Reset Password
      </h1>
      <hr />
      <form className=" flex flex-col w-96" onSubmit={handleResetPassword}>
        <input
          type="password"
          required
          placeholder="New Password"
          className="p-4 m-2 rounded-lg text-slate-700"
        />
        <input
          type="password"
          required
          placeholder="Confirm Password"
          className="p-4 m-2 rounded-lg text-slate-700"
        />
        <button
          type="submit"
          className="bg-orange-700 hover:bg-orange-500 text-white  p-3 rounded-lg m-2"
        >
            Reset Password
        </button>
      </form>
    </div>
    );
}