import React from "react";

export default function Loader() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center align-middle bg-black bg-opacity-80 mb-0">
        <div className="block justify-center align-middle h-[300px] w-[300px]">
            <div className="relative h-[60px] w-[300px] flex justify-center align-middle mb-0 m-auto">
                <div className="absolute w-full h-[40px] sm:w-[500px] inline-block mt-2"></div>
                <div className="absolute inline-block mx-auto h-[60px] w-[100px]">
                    <img src={process.env.PUBLIC_URL + "/images/logo.png" } alt="Loading..." className="" />
                </div>
            </div>
            <div className="loader">
                <div className="loading-container items-center flex justify-center space-x-5">
                    <span className="letter-text">l</span>
                    <span className="letter-text">o</span>
                    <span className="letter-text">a</span>
                    <span className="letter-text">d</span>
                    <span className="letter-text">i</span>
                    <span className="letter-text">n</span>
                    <span className="letter-text">g</span>
                </div>
            </div>
        </div>
    </div>
  );
}
