"use client";
import axios from "axios";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
export default function verifyEmail(){
  const router = useRouter();
  const [token, setToken] = React.useState("");
  const [type, setType] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(true);
  const [isVerified, setIsVerified] = React.useState(false);
  const handleVerifyEmail = async () => {
    try {
      const resposne = await axios.post("/api/users/verifyemail", {
        token,
        type,
      });
      const data = resposne.data;
      if (data.success) {
        toast.success(data.message);
        setIsVerified(true);
        if (type === "VERIFY") toast.success("Please login to continue");
        else if (type === "RESET") router.push(`/login/changePassword?token=${token}`);
      } else throw new Error(data.message);
    } catch (error: any) {
      setIsVerified(false);
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsProcessing(false);
    }
  };
  React.useEffect(() => {
    const searchQuery = window.location.search.slice(1);
    const urlToken = searchQuery.split("&")[0].split("=")[1];
    const urlType = searchQuery.split("&")[1].split("=")[1];
    setToken(urlToken);
    setType(urlType);
    if (token && type) handleVerifyEmail();
  }, [token, type]);
  return (
    <div className="text-center">
      {/* <h1>Email Verification</h1>
      {isVerified && (
          <h1 className="text-3xl">Email verified Successfully</h1>
        ) && <Link href={"/login"}>Login</Link>}
      {!isProcessing && !isVerified && (
        <h1 className="text-3xl">Email verification failed</h1>
      )} */}
    </div>
  );
};

