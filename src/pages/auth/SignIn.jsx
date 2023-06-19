import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeCloseLine  } from "react-icons/ri";
import { TiEyeOutline } from "react-icons/ti";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import OAuth from "../../components/OAuth";

export default function SignIn() {
  const [viewPassword, setViewPassword] = useState(false);
  const nav = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  function handleChange(e) {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }


  return (
  <div className="flex auth">
    <div className="lg:flex-1 mx-auto md:flex-col w-full my-5 formCont">
      <div className="form w-3/5 p-7 mx-auto text-green-900 font-semibold shadow-thick shadow-md min-w-[280px]">
        <h1 className="text-3xl pb-3 mt-10">Login Account</h1>
        <p className="text-sm ">Welcome back! Please log in to access your account and manage your preferences.</p>
        <form action="" className="">
          <div className="relative">
          <span className="absolute left-5 bottom-3 text-xl"> <HiMail /> </span>
            <input type="email" id="email" className="p-2 pl-12 w-full mt-10 rounded-full" 
              value={email}
              onChange={handleChange}
              placeholder="Email Address" 
            />
          </div>

          <div className="relative">
            <span className="absolute left-5 bottom-3 text-xl"> <RiLockPasswordFill /> </span>
            <input id="password" className="p-2 pl-12 w-full mt-3 rounded-full" 
              type={viewPassword ? "text" : "password"}
              placeholder="Password" 
              value={password} 
              onChange={handleChange}
            />
            <span className="absolute right-5 bottom-3 text-xl cursor-pointer"
              onClick={() => setViewPassword((prevVisible) => !prevVisible)} >
              { viewPassword ? <TiEyeOutline /> : <RiEyeCloseLine /> }
            </span>
          </div>
          <div className="text-end mt-1">
            <Link to="/auth/forgot-password" 
              className="text-sm text-red-600 hover:text-red-800 transition duration-200">Forgot Password?
            </Link>
          </div>
          <button className="border p-2 w-full mt-7 rounded-full hover:shadow-lg hover:text-white transition duration-300 ease-in-out px-4 py-2">Login</button>
        </form>
        <div className=" items-center my-4 
         before:border-t before:border-flex-1 before:border-red-700
         after:border-t after:border-flex-1 after:border-red-700">
          <p className="text-center text-sm">Or continue using</p>
        </div>
        <div className="mb-10">
          <OAuth />
        </div>
        <div className="text-center">
          <p className="text-sm"> Don't have an account?</p>
          <Link to="/auth/sign-up" className="text-red-600 hover:text-red-800 transition duration-200">Sign Up</Link>
        </div>
      </div>
    </div>
    <div className="lg:flex-1 imgCont">
      <img src={process.env.PUBLIC_URL + '/images/login.jpeg'} alt="" className="object-cover w-full h-full"/>
    </div>

  </div>
  );
}
