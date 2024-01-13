import React from "react";
// import loader from "../assets/svg/loader.svg";

export default function Loader() {
  return (
    <div className="w-full h-[100vh] flex justify-center bg-black bg-opacity-80 mb-0">
        <div className="block justify-center align-middle h-[300px] w-[300px] mt-[35vh]">
            <div className="relative h-[60px] w-[300px] flex justify-center align-middle mb-0 m-auto">
                {/* <img src={loader} alt="Loading..." className=" inline-block" /> */}
                <div className="absolute w-full h-[40px] sm:w-[500px] inline-block mt-2"></div>
                <div className="absolute inline-block mx-auto h-[60px] w-[100px]">
                    <img src={process.env.PUBLIC_URL + "/images/logo.png" } alt="Loading..." className="" />
                </div>
            </div>
            <div className="loader">
                <div className="loading-container items-center flex justify-center space-x-5">
                    <span class="letter-text">l</span>
                    <span class="letter-text">o</span>
                    <span class="letter-text">a</span>
                    <span class="letter-text">d</span>
                    <span class="letter-text">i</span>
                    <span class="letter-text">n</span>
                    <span class="letter-text">g</span>
                </div>
            </div>
        </div>
    </div>
  );
}
