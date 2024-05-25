"use client";
// by default, every compoenent is a server component in nextjs, so to make it for client side, we write "use client" at the top of the component page.
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [signupButtonDisabled, setSignupButtonDisabled] = React.useState(true);
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const handleSignup = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);   
    try {
      const response = await axios.post('/api/users/signup',user);
      console.log(response.data);
      if(response.data.status === 201)
      {
        toast.success("User signed up successfully");
        router.push('/login');
      }
      else throw new Error(response.data.message);
    } catch (error:any) {
      toast.error(error.message);
      console.log(error.message);
    }
    finally{
      setLoading(false);
    }   
  };
  React.useEffect(()=>{
    if(user.username && user.email && user.password){
      setSignupButtonDisabled(false);
    }
    else{
      setSignupButtonDisabled(true);
    }
  },[user])
  return (
    <div className="flex flex-col items-center mt-36">
      <h1 className=" text-orange-500 text-3xl p-3 font-bold ">Sign Up</h1>
      <hr />
      <form className=" flex flex-col w-96" onSubmit={handleSignup}>
        <input
          type="text"
          value={user.username}
          required
          placeholder="Username"
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
          className="p-4 m-2 rounded-lg text-slate-700"
        />
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
        <button type="submit" disabled={signupButtonDisabled} className={`p-4 bg-orange-700 ${(!signupButtonDisabled)?"hover:bg-orange-500":"opacity-[0.6]"} m-2 rounded-lg`}>
          {loading?"loading...":"Signup"}
        </button>
      </form>
      <Link href="/login" className=" underline">Visit Login Page</Link>
    </div>
  );
}
