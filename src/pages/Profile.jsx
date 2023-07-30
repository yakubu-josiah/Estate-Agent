import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [editMode, setEditMode] = useState(true);
  // const [showForm, setShowForm] = useState(false);

  const editForm = (e) => {
    e.stopPropagation();
    setEditMode(false);
    console.log("Clicked!!");
  };
  const saveForm = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };
  const submitName = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className="profileCont">
      <div className="">
        <div className="imgCont h-[200px] w-full">
          <div className="">
            <form action="" onSubmit={submitName}>
              <div className="image ml-9 mt-12 flex ">
                <div
                  id="img"
                  className="rounded-md row-auto h-[200px] w-[200px] mr-9 space-y-3 border-4 border-white shadow-lg"
                >
                  <div className="bg-red-400 w-full h-full"></div>
                  {editMode ? (
                    <button
                      className="border-2 border-gray-500 text-gray-500 hover:bg-gray-600 hover:text-white font-bold py-1 w-full rounded transition duration-300 ease-in-out"
                      onClick={editForm}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white font-bold py-1 w-full rounded transition duration-300 ease-in-out"
                      type="submit"
                      onClick={saveForm}
                    >
                      Save Changes
                    </button>
                  )}
                </div>
                <div className="text-white rounded-md mt-15 flex flex-col items-center justify-center">
                  {editMode ? (
                    <h5 className="text-4xl">Alfie Solomon</h5>
                  ) : (
                    <input
                      type="text"
                      name="name"
                      placeholder="Alfie Solomons"
                      className="text-[26px] text-center p-1 max-w-[210px] text-black rounded-full"
                    />
                  )}

                  <p>alfie@solomon.edu</p>
                </div>
              </div>
            </form>
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
