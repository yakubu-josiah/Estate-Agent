import React from "react";
import loader from "../assets/svg/loader.svg";

export default function Loader() {
  return (
    <div className="relative w-full h-[100vh] flex bg-black bg-opacity-80 mb-0">
      <div className="w-[200px] h-[200px] m-auto">
        <img src={loader} alt="Loading..." />
        <i className="absolute bottom-[17rem] ml-14 right-auto left-auto block text-gray-300 text-lg">
          loading....
        </i>
      </div>
    </div>
  );
}
