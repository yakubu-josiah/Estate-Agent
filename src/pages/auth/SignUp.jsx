import { useState } from "react";
import { Link } from "react-router-dom";
import { RiEyeCloseLine, RiLockPasswordFill } from "react-icons/ri";
import { TiEyeOutline, TiPhone } from "react-icons/ti";
import { HiMail, HiUser } from "react-icons/hi";
import OAuth from "../../components/OAuth";
import { db } from "../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, updateProfile, updatePhoneNumber } from "firebase/auth";

export default function SignUp() {
  const [viewPassword, setViewPassword] = useState(false);
  const [formData, setformData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });

  const { username, email, phoneNumber, password, confirmPassword } = formData;
  function handleChange(e) {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  
  async function submitForm(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      updateProfile(auth.currentUser, {
        displayName: username,
      });
      updatePhoneNumber(auth.currentUser, {
        phoneNumber: phoneNumber,
      })
      console.log(userCredential.user);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="flex auth">
    <div className="lg:flex-1 mx-auto md:flex-col w-full my-5 formCont">
      <div className="form w-3/5 p-7 mx-auto text-green-900 font-semibold shadow-thick shadow-md min-w-[280px]">
        <h1 className="text-3xl pb-3 mt-10">Create an account</h1>
        <p className="text-sm ">Become a member today and access premium content and resources.</p>
        <form onSubmit={submitForm} className="">
          <div className="relative">
            <span className="absolute left-5 bottom-3 text-xl"> <HiUser /> </span>
            <input type="text" id="username" className="sm:text-[12px] p-2 pl-12 w-full mt-10 rounded-full" 
              value={username}
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <span className="absolute left-5 bottom-3 text-xl"> <HiMail /> </span>
            <input type="email" id="email" className="sm:text-[12px] p-2 pl-12 w-full mt-3 rounded-full" 
              value={email}
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <span className="absolute left-5 bottom-3 text-xl"> <TiPhone /> </span>
            {/* <span className="country-code bottom-2 left-10 absolute">+1</span> */}
            <input type="number" id="phoneNumber" className="sm:text-[12px] p-2 pl-12 w-full mt-3 rounded-full" 
              value={phoneNumber}
              placeholder="(+234) Phone Number"
              onChange={handleChange} 
            />
          </div>
          <div className="relative">
            <span className="absolute left-5 bottom-3 text-xl"> <RiLockPasswordFill /> </span>
            <input id="password" className="sm:text-[12px] p-2 pl-12 w-full mt-3 rounded-full" 
              type="password"
              placeholder="Password" 
              value={password} 
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <span className="absolute left-5 bottom-3 text-xl"> <RiLockPasswordFill /> </span>
            <input id="confirmPassword" className="sm:text-[12px] p-2 pl-12 w-full mt-3 rounded-full" 
              type={viewPassword ? "password" : "text"}
              placeholder="Confirm Password" 
              value={ password } 
              onChange={handleChange}
            />
            <span className="absolute right-5 bottom-3 text-2xl cursor-pointer"
              onClick={() => setViewPassword((prevVisible) => !prevVisible)} >
              { viewPassword ? <RiEyeCloseLine /> : <TiEyeOutline /> }
            </span>
          </div>
          <div className="text-end mt-1">
            <Link to="/auth/forgot-password" 
              className="text-sm text-red-600 hover:text-red-800 transition duration-200">Forgot Password?
            </Link>
          </div>
          <button type="submit" className="border p-2 w-full mt-7 rounded-full hover:shadow-lg hover:text-white transition duration-300 ease-in-out px-4 py-2">Register</button>
        </form>
        <div className="items-center my-4 
         before:border-t before:border-flex-1 before:border-red-700
         after:border-t after:border-flex-1 after:border-red-700">
          <p className="text-center text-sm">Or sign up using</p>
        </div>
        <div className="mb-10">
          <OAuth />
        </div>
        <div className="text-center">
          <p className="text-sm">Already a member?</p>
          <Link to="/auth/sign-in" className="text-red-600  hover:text-red-800 transition duration-200">Login</Link>
        </div>
      </div>
    </div>
    <div className="lg:flex-1 imgCont">
      <img src={process.env.PUBLIC_URL + '/images/sign-up.jpeg'} alt="" className="object-cover w-full h-full"/>
    </div>

  </div>
  )
}
