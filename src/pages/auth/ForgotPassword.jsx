import React, { useState } from "react";
import OAuth from "../../components/OAuth";
import { Link } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { MdVerifiedUser } from "react-icons/md";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [form, setForm] = useState(true);
  const [email, setEmail] = useState("");
  function handleChage(e) {
    setEmail(e.target.value);
  }
  const [formSuccess, setformSuccess] = useState(false);
  const auth = getAuth();
  const forgot = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setForm(false);
      setformSuccess(true);
      console.log("Email Sent!!");
    } catch (error) {
      console.log("Couldn't send reset password");
    }
    console.log("Cart Witnessing !!");
  };

  return (
    <div className="flex auth">
      {form && (
        <div className="lg:flex-1 mx-auto md:flex-col w-full my-5 formCont">
          <div className="form w-3/5 p-7 mx-auto text-green-900 font-semibold shadow-thick shadow-md min-w-[280px]">
            <h1 className="text-3xl pb-3 mt-10">Forgot Password?</h1>
            <p className="text-sm ">
              No problem. Just let us know your email address and we will email
              you a password reset link that will allow you to choose a new one.
            </p>
            <form onClick={forgot}>
              <div className="relative">
                <span className="absolute left-5 bottom-3 text-xl">
                  <HiUser />
                </span>
                <input
                  type="email"
                  id="email"
                  className="p-2 pl-12 w-full mt-10 rounded-full"
                  value={email}
                  onChange={handleChage}
                  placeholder="Enter Email Address"
                />
              </div>
              <button className="border p-2 w-full mt-7 rounded-full hover:shadow-lg hover:text-white transition duration-300 ease-in-out px-4 py-2">
                Reset Password
              </button>
            </form>
            <div
              className=" items-center my-4 
         before:border-t before:border-flex-1 before:border-red-700
         after:border-t after:border-flex-1 after:border-red-700"
            >
              <p className="text-center text-sm">Or continue using</p>
            </div>
            <div className="mb-10">
              <OAuth />
            </div>
            <div className="text-center">
              <p className="text-sm"> Don't have an account?</p>
              <Link
                to="/auth/sign-up"
                className="text-red-600 hover:text-red-800 transition duration-200"
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
              Before continuing, could you set a new password by clicking on the
              link we just emailed to you. If you didn't receive the email, we
              will gladly send you another.
            </p>
          </div>
        </div>
      )}
      <div className="lg:flex-1 imgCont">
        <img
          src={process.env.PUBLIC_URL + "/images/forgot-password.jpeg"}
          alt=""
          className="object-cover w-full h-full"
          onClick={forgot}
        />
      </div>
    </div>
  );
}
