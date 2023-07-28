import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="profileCont">
      <div className="">
        <div className="imgCont h-[200px] w-full">
          <div className="">
            <div className="image ml-9 mt-12 flex ">
              <div
                id="img"
                className="rounded-md row-auto h-[200px] w-[200px] mr-9 space-y-3 border-4 border-white shadow-lg"
              >
                <div className="bg-red-400 w-full h-full"></div>
                <button className="border-2 border-gray-500 text-gray-500 hover:bg-gray-600 hover:text-white font-bold py-1 w-full rounded transition duration-300 ease-in-out">
                  Edit profile
                </button>
              </div>
              <div className="text-white rounded-md mt-20">
                <h5 className="text-4xl">Alfie Solomon</h5>
                <p>alfie@solomon.edu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <p>Here Goes The Profile Page For Authenticated User...</p>
      </div>
      <br />
      <br />
      <Link to="/" className="text-red-300">
        Go Back Home
      </Link>
    </div>
  );
}
