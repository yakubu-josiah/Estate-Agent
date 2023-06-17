import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeCloseLine  } from "react-icons/ri";
import { TiEyeOutline } from "react-icons/ti";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

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
  <div className="flex auth flex-wrap sm:flex-wrap">
    <div className="lg:flex-1 m-auto md:flex-col w-full">
      <div className="form w-3/5 m-auto p-10 text-green-900 font-semibold shadow-thick shadow-md min-w-[320px] sm:border-none md:border-none">
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
            <Link to="/auth/forgot-password" className="text-sm cursor-pointer">Forgot Password</Link>
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
