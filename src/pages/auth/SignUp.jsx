import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeCloseLine, RiLockPasswordFill } from "react-icons/ri";
import { TiEyeOutline, TiPhone } from "react-icons/ti";
import { HiMail, HiUser } from "react-icons/hi";
import OAuth from "../../components/OAuth";
import { db } from "../../firebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormValidation } from "../../hooks/useFormValidations";


const validationRules = {
  username: {
    rule: (value) => !!value && value.length > 6, 
    message: "Username must be at least 6 characters long",
  },
  email: {
    rule: (value) => /^[^@]+@[^@]+\.[^@]+$/.test(value), 
    message: "Please enter a valid email address.",
  },
  phoneNumber: {
    rule: (value) => value.length >= 11, 
    message: "Please enter a valid phone number.",
  },
  password: {
    rule: (value) => value.length >= 6 && /[!@#$%^&*(),.?":{}/~`|<>]/.test(value), 
    message: "Password must be at least 6 characters and contain at least one special character",
  },
  
};

export default function SignUp() {

  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [formData, setformData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const { username, email, password, phoneNumber } = formData;
  const { errors, isValid } = useFormValidation(formData, validationRules);

  function handleChange(e) {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    setIsCompleted(false);
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!isValid){
      setIsCompleted(true);
      return;
    };
    
    try {
      setIsLoading(true);
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: username,
      });
      const user = userCredential.user;
      const data = { ...formData };
      delete data.password;
      data.timestamp = Timestamp.fromDate(new Date());

      await setDoc(doc(db, "users", user.uid), data);
      toast.success("Account created successfully!!!");
      nav("/");
    } catch (error) {
      toast.error("Oops! Network error, please try again. ");
    }finally {
      setIsLoading(false);  
    }
  }


  return (
    <div className="flex auth">
      <div className="lg:flex-1 mx-auto md:flex-col w-full my-5 formCont">
        <div className="form w-3/5 p-7 mx-auto text-green-900 font-semibold shadow-thick shadow-md min-w-[280px]">
          <h1 className="text-3xl pb-3 mt-10">Create an account</h1>
          <p className="text-sm ">
            Become a member today and access premium content and resources.
          </p>
          <form onSubmit={submitForm} className="">
            <div className="relative">
              <span className={`absolute left-5 bottom-3 text-xl signUp ${errors.username && formData.username !== "" ? "text-red-500 lg:top-[3.1rem] top-[1.3rem]" : ""}`}>
                {" "}
                <HiUser />{" "}
              </span>
              <input
                type="text"
                id="username"
                className={`sm:text-[12px] p-2 pl-12 w-full mt-10 rounded-full ${errors.username && formData.username !== "" ? "border-red-500 text-red-500": "" 
              }`}
                value={username}
                placeholder="Username"
                onChange={handleChange}
              />
              {errors.username && formData.username !== "" && (
                <p className="text-red-500 text-sm mt-2 font-light pl-3">{errors.username}</p>
              )}
            </div>


            <div className="relative">
              <span className={`absolute left-5 bottom-3 text-xl login ${errors.email && formData.email !== "" ? "text-red-500 top-[1.4rem]" : ""}`}>
                {" "}
                <HiMail />{" "}
              </span>
              <input
                type="email"
                id="email"
                className={`sm:text-[12px] p-2 pl-12 w-full mt-3 rounded-full ${errors.email && formData.email !== "" ? "border-red-500 text-red-500": ""}`}
                value={email}
                placeholder="Email Address"
                onChange={handleChange}
              />
              {errors.email && formData.email !== "" && (
                <p className="text-red-500 text-sm mt-2 font-light pl-3">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <span className={`absolute left-5 bottom-3 text-xl login ${errors.phoneNumber && formData.phoneNumber !== "" ? "text-red-500 top-[1.4rem]" : ""}`}>
                {" "}
                <TiPhone />{" "}
              </span>
              {/* <span className="country-code bottom-2 left-10 absolute">+1</span> */}
              <input
                type="number"
                id="phoneNumber"
                className={`sm:text-[12px] p-2 pl-12 w-full mt-3 rounded-full ${errors.phoneNumber && formData.phoneNumber !== "" ? "border-red-500 text-red-500": ""}`}
               
                value={phoneNumber}
                pattern="[0-9]+"
                inputMode="numeric"
                placeholder="(+234) Phone Number"
                onChange={handleChange}
              />
              {errors.phoneNumber && formData.phoneNumber !== "" && (
                <p className="text-red-500 text-sm mt-2 font-light pl-3">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="relative">
              <span className={`absolute left-5 bottom-3 text-xl login ${errors.password && formData.password !== "" ? "text-red-500 top-[1.4rem]" : ""}`}>
                {" "}
                <RiLockPasswordFill />{" "}
              </span>
              <input
                id="password"
                className={`sm:text-[12px] p-2 pl-12 w-full mt-3 rounded-full ${errors.password && formData.password !== "" ? "border-red-500 text-red-500": ""}`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
              {errors.password && formData.password !== "" && (
                <p className="text-red-500 text-sm mt-2 font-light pl-3">{errors.password}</p>
              )}
            </div>
            <div className="relative">
              <span className={`absolute left-5 bottom-3 text-xl cursor-pointer login ${isCompleted ? "top-[1.4rem] " : ""}`}>
                {" "}
                <RiLockPasswordFill />{" "}
              </span>
              <input
                id="confirmPassword"
                className="sm:text-[12px] p-2 pl-12 w-full mt-3 rounded-full"
                type={viewPassword ? "password" : "text"}
                placeholder="Confirm Password"
                value={password}
                disabled
              />
              <span
                className={`absolute right-5 bottom-3 text-2xl cursor-pointer login ${isCompleted ? "top-[1.1rem] " : ""}`}
                onClick={() => setViewPassword((prevVisible) => !prevVisible)}
              >
                {viewPassword ? <RiEyeCloseLine /> : <TiEyeOutline />}
              </span>
              {isCompleted && (
                <p className="text-red-500 text-sm mt-2 font-bold pl-3">*Please complete the form</p>
              )}
            </div>
            
            <div className="text-end mt-1">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-[#585852] hover:text-red-800 transition duration-200"
              >
                Forgot Password?
              </Link>
            </div>
            <>
              {isLoading ? (
                <button className="relative border p-2 w-full mt-7 rounded-full hover:shadow-lg hover:text-white transition duration-300 ease-in-out px-4 py-2 cursor-not-allowed opacity-60">
                  <div className="flex justify-center my-0 py-0">
                    <span>Registering..</span>
                    <span className="spinner cursor-not-allowed "></span>
                  </div>
                </button>
              ) : (
                <button className="border p-2 w-full mt-7 rounded-full hover:shadow-lg hover:text-white transition duration-300 ease-in-out px-4 py-2">
                  Register
                </button>
              )}
            </>
          </form>
          <div className="mb-10">
            <OAuth />
          </div>
          <div className="text-center">
            <p className="text-sm">Already a member?</p>
            <Link
              to="/auth/sign-in"
              className="text-red-600  hover:text-red-800 transition duration-200 underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:flex-1 imgCont">
        <img
          src={process.env.PUBLIC_URL + "/images/sign-up.jpeg"}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
