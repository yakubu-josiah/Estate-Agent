import React, { useState } from "react";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { getAuth, signOut } from "firebase/auth";

export default function Profile() {
  const nav = useNavigate();
  const auth = getAuth();
  const [editMode, setEditMode] = useState(true);

  const { user } = useAuthStatus();
  const username = user ? user.displayName : "Unknown User";
  const email = user ? user.email : "Unknown User";
  const editForm = (e) => {
    setEditMode(false);
    console.log("Clicked!!");
  };
  const saveForm = (e) => {
    setEditMode(true);
  };
  const submitName = (e) => {
    e.preventDefault();
  };

  const onSignOut = async () => {
    try {
      await signOut(auth);
      console.log("user logged out");
      nav("/");
    } catch (error) {
      console.log("Error occurred during logout:", error);
    }
  };
  return (
    <div className="profileCont">
      <div className="">
        <div className="imgCont h-[200px] w-full">
          <div className="relative">
            <span
              className="absolute sm:right-5 right-1 sm:top-40 top-5 text-xs text-white hover:cursor-pointer hover:bg-red-500"
              onClick={onSignOut}
            >
              {" "}
              sign out
              <MdLogout />{" "}
            </span>
            <form onSubmit={submitName}>
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
                    <input
                      className="border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white font-bold py-1 w-full rounded transition duration-300 ease-in-out"
                      type="submit"
                      onClick={saveForm}
                      value="Save Changes"
                    />
                  )}
                </div>
                <div className="text-white rounded-md mt-15 flex flex-col items-center justify-center">
                  {editMode ? (
                    <h5 className="text-4xl">{username}</h5>
                  ) : (
                    <input
                      type="text"
                      name="name"
                      value={username}
                      placeholder="Enter a username"
                      className="text-[26px] text-center p-1 max-w-[210px] text-black rounded-full"
                    />
                  )}

                  <p>{email}</p>
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
