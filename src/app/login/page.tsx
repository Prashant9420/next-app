"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-hot-toast";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [loginButtonDisabled, setLoginButtonDisabled] = React.useState(true);
  const handleClick = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()   
    setLoading(true);
    try {
      const response = await axios.post('/api/users/login',user);

      if(response.data.success){
        toast.success("Welcome!");
        router.push('/profile');
      }
      else throw new Error(response.data.message);
      
    }
    catch (error:any) {
      toast.error(error.message);
      console.log(error.message);
    }
    finally{
      setLoading(false);
    }
  };
  React.useEffect(()=>{
    if(user.email && user.password){
      setLoginButtonDisabled(false);
    }
    else{
      setLoginButtonDisabled(true);
    }
  },[user])
  return (
    <div className="flex flex-col items-center mt-36">
      <h1 className=" text-orange-500 text-3xl p-3 font-bold ">Login</h1>
      <hr />
      <form className=" flex flex-col w-96" onSubmit={handleClick}>
        <input
          type="email"
          value={user.email}
          placeholder="Email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          className="p-4 m-2 rounded-lg text-slate-700"
        />
        <input
          type="password"
          value={user.password}
          placeholder="Password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          className="p-4 m-2 rounded-lg text-slate-700"
        />
        <button type="submit" disabled={loginButtonDisabled} className={`p-4 bg-orange-700 ${(!loginButtonDisabled)?"hover:bg-orange-500":"opacity-[0.6]"} m-2 rounded-lg text-white font-bold`}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <Link href="/login/forgotPassword" className="underline">Forgot Password?</Link>
      <Link href="/signup" className="underline">Visit Signup Page</Link>
    </div>
  );
}
