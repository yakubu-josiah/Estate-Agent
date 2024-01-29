import React, { useState } from "react";
import OAuth from "../../components/OAuth";
import { Link } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { MdVerifiedUser } from "react-icons/md";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [form, setForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formSuccess, setformSuccess] = useState(false);

  function handleChange(e) {
    setEmail(e.target.value);
    setErrorMessage(false);
  }
  
  const passwordResetEmail = async (e) => {
    e.preventDefault();
    if(!email){
      setErrorMessage("Please enter your email address.");
      return;
    }
    try {
      setErrorMessage(false);
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      setForm(false);
      setformSuccess(true);
      toast.success("Email sent successfully!");
    } catch (error) {
      setErrorMessage("Invalid email address");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex auth">
      {form && (
        <div className="lg:flex-1 mx-auto md:flex-col w-full my-5 formCont">
          <div className="form w-3/5 p-7 mx-auto text-green-900 font-semibold shadow-thick shadow-md min-w-[280px]">
            <h1 className="text-3xl pb-3 mt-10">Forgot Password?</h1>
            <p className="text-sm">
              No problem. Just let us know your email address and we will email
              you a password reset link that will allow you to choose a new one.
            </p>
            <form onSubmit={passwordResetEmail}>
              <div className="relative">
<<<<<<< HEAD
                  <span className={`absolute forgot left-5 bottom-3 text-xl ${errorMessage ? "lg:top-[3.1rem] top-[3.1rem] text-red-500" : ""}`}>
=======
                  <span className={`absolute left-5 bottom-3 text-xl ${errorMessage ? "lg:top-[3.1rem] md:top-[3.2rem] top-[3.5rem] text-red-500" : ""}`}>
>>>>>>> 5c8bc58c5da05b5d6ff72b81d5ff80795bc13053
                  <HiUser />
                </span>
                <input
                  type="email"
                  id="email"
                  className={`p-2 pl-12 w-full mt-10 rounded-full ${
                    errorMessage ? "border-red-500 text-red-500 focus:border-0": ""
                  }`} 
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                />
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2 font-light pl-3">{errorMessage}</p>
                )}
              </div>
              <>
                {isLoading ? (
                  <button className="relative border p-2 w-full mt-7 rounded-full hover:shadow-lg hover:text-white transition duration-300 ease-in-out px-4 py-2 cursor-not-allowed opacity-60">
                    <div className="flex justify-center my-0 py-0">
                      <span>Authenticating..</span>
                      <span className="spinner cursor-not-allowed "></span>
                    </div>
                  </button>
                ) : (
                  <button className="border p-2 w-full mt-7 rounded-full hover:shadow-lg hover:text-white transition duration-300 ease-in-out px-4 py-2"
                  >
                    Reset Password
                  </button>
                )}
              </>
            </form>
            <div className="mb-10">
              <OAuth />
            </div>
            <div className="text-center">
              <p className="text-sm"> Don't have an account?</p>
              <Link
                to="/auth/sign-up"
                className="text-red-600 hover:text-red-800 transition duration-200 underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}

      {formSuccess && (
        <div className="lg:flex-1 mx-auto md:flex-col w-full my-auto min-h-[250px] formCont">
          <div className="form w-3/5 p-7 mx-auto md:my-auto text-green-900 font-semibold shadow-thick shadow-md min-w-[280px]">
            <div className="relative">
              <h1 className="text-3xl pb-3 mt-10">
                Email Verified
                <span className="ml-2 absolute right">
                  <MdVerifiedUser />
                </span>
              </h1>
            </div>
            <p className="text-sm lg:text-lg">
              Before you proceed, please take a moment to set a new password by clicking on the link we've just sent to your email. 
              In case you don't see it in your inbox, no worries - we're happy to send it again. 
              Check your spam folder or simply request another reset, and you'll be back in action in no time!
            </p>
          </div>
        </div>
      )}
      <div className="lg:flex-1 imgCont">
        <img
          src={process.env.PUBLIC_URL + "/images/forgot-password.jpeg"}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
