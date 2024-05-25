"use client";
import React from "react";
import axios from "axios";
import {sendMail} from "@/helpers/mailer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "../loading";

// [param_name] file naming with sqaure backets is used for params
export default function UserProfile({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user,setUser] = React.useState<any>("");
  const [isSendingMail,setIsSendingMail] = React.useState(false);
  const getUserDetails = async () =>{
    try {
        const response = await axios.get("/api/users/me");
        setUser(response.data.data)
        
    } catch (error:any) {
        console.log(error.message)
    }
  }
  const handleVerifyNow = async () =>{
    setIsSendingMail(true);
    try {
      const resposne = await axios.post("/api/users/verifyuser",{email:user.email,emailType:"VERIFY",userId:user._id});
      if(resposne.data.success)
      {
        toast.success(resposne.data.message);
      }else throw new Error(resposne.data.message);
    } catch (error:any) {
      toast.error(error.message);
    }
    finally{
      setIsSendingMail(false);
    }
  }
  React.useEffect(()=>{
    getUserDetails()
  },[])
  return (
    <div className="mt-10 flex justify-center">
      <div className=" fixed left-0 p-3 top-0 bg-slate-600 rounded-lg m-3 hover:bg-slate-500 cursor-pointer" onClick={()=>router.push('/profile')}>Home</div>
      {user && <div className=" w-max py-3 rounded-md">
      
        <span className="py-4 pl-4 text-4xl">Welcome, </span>
        <span className="bg-blue-500 px-4 py-2 text-4xl text-white rounded-md">
          {user.username}
        </span>
        <span className={`${(user.isVerified)?"bg-green-500":"bg-red-500"} px-4 py-2 ml-3 text-4xl text-black rounded-md`}>
          {user.isVerified?"Verified":"Not Verified"}
        </span>
        {(!isSendingMail)?user && !user.isVerified && <button className="p-3 m-3 border-blue-500 border-2 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white " onClick={handleVerifyNow}>verify now!</button>:<Loading/>}

      </div>}
    </div>
  );
}
