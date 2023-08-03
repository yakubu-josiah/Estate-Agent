import React from "react";
// import loader from "../assets/svg/loader.svg";

export default function Loader() {
  return (
    <div className="w-full h-[100vh] flex justify-center bg-black bg-opacity-80 mb-0">
      <div className="block justify-center align-middle h-[300px] w-[300px] mt-[35vh]">
        <div className="relative h-[60px] w-[300px] flex justify-center align-middle mb-0 m-auto">
          {/* <img src={loader} alt="Loading..." className=" inline-block" /> */}
          <div className="absolute loader w-full h-[40px]  sm:w-[500px] inline-block mt-2"></div>
          <div className="absolute inline-block mx-auto h-[60px] w-[100px]">
            <img
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              alt="Loading..."
              className=""
            />
          </div>
        </div>
        <div className="mx-auto w-full ">
          <p className="text-center text-xs text-gray-300 sm:text-lg">
            loading....
          </p>
        </div>
      </div>
    </div>
  );
}
