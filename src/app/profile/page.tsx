"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import React from "react";
import Loading from "./loading";
export default function ProfilePage() {
  const router = useRouter();
  const [username,setUsername] = React.useState("");
  const handleLogout = async () => {
    try {
      await axios("/api/users/logout");
      toast.success("User logged out successfully");
      router.push("/login");
    } catch (error: any) {  
      console.log(error.message);
    }
  };
  const getUserDetails = async () =>{
    try {
        const response = await axios.get("/api/users/me");
        console.log(response.data);
        setUsername(response.data.data._id)
        
    } catch (error:any) {
        console.log(error.message)
    }
  }
  React.useEffect(()=>{
    getUserDetails()
  },[])
  return (
    <div className="mt-40 text-center">
      <h1 className="mb-3">Profile Page</h1>
      {username?<Link href={`profile/${username}`} className=" underline">Go to my Profile</Link>:<Loading/>}<br/>
      <button
        className="bg-red-700 mt-9 p-2 hover:bg-red-500 rounded-lg text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
