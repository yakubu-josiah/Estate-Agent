import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const nav = useNavigate();

  return (
  <div className="flex auth flex-wrap sm:flex-wrap">
    <div className="lg:flex-1 m-auto md:flex-col w-full">
      <div className="form w-3/5 m-auto p-10 text-green-900 font-semibold shadow-thick shadow-md min-w-[320px] sm:border-none md:border-none">
        <h1 className="text-3xl pb-3 mt-10">Login Account</h1>
        <p className="text-sm ">Welcome back! Please log in to access your account and manage your preferences.</p>
        <form action="" className="">
          <input type="email" className="border p-2 pl-12 w-full mt-10 rounded-full" placeholder="Email"/>
          <input type="password" className="border p-2 pl-12 w-full mt-3 rounded-full" placeholder="Password"/>
          <div className="text-end mt-2">
            <p onClick={() => {nav('/auth/forgot-password')}} className="text-sm cursor-pointer">Forgot Password?</p>
            {/* <a onClick={() => {nav('/auth/forgot-password')}} className="text-sm">Forgot Password?</a> */}
          </div>
          <button className="border p-2 w-full mt-10 mb-5 rounded-full">Login</button>
        </form>
      </div>
    </div>

    <div className="lg:flex-1 lg:h-full flex-col-reverse md:w-full md:h-[500px] ">
      <img src={process.env.PUBLIC_URL + '/images/login.jpeg'} alt="" className="object-cover w-full h-full"/>
    </div>
  </div>
  );
}
