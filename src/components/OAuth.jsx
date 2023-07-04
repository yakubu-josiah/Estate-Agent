import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

export default function OAuth() {
  return (
    <div className="flex justify-center text-4xl">
      <FaFacebookF className="rounded-full p-1 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all" />
      <FcGoogle className="rounded-full p-1 ml-2 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all" />
      <FaTwitter className="rounded-full p-1 ml-2 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all" />
    </div>
  );
}
