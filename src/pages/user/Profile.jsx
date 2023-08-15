import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { getAuth, updateProfile } from "firebase/auth";
import { RiAddCircleFill } from "react-icons/ri";

export default function Profile() {
  const auth = getAuth();
  const [editMode, setEditMode] = useState(true);

  const { user } = useAuthStatus();
  const username = user ? user.displayName : "Unknown User";
  const email = user ? user.email : "Unknown User";

  const [formData, setFormData] = useState({
    formUsername: username,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editForm = (e) => {
    setEditMode(false);
    console.log("Clicked!!");
  };
  const saveForm = async () => {
    try {
      if (username !== formData.formUsername) {
        await updateProfile(auth.currentUser, {
          displayName: formData.formUsername,
        });
        setEditMode(true);
        console.log("Profile updated successfully!");
      }
      setEditMode(true);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      formUsername: username,
    }));
  }, [username]);
  return (
    <div className="profileCont background mb-0">
      <div className="">
        <div className="imgCont h-[200px] w-full">
          <div className="relative">
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
                    value="Save Changes"
                    onClick={saveForm}
                  />
                )}
              </div>
              <div className="text-white rounded-md mt-15 flex flex-col items-center justify-center">
                {editMode ? (
                  <h5 className="text-4xl">{username}</h5>
                ) : (
                  <input
                    type="text"
                    name="formUsername"
                    value={formData.formUsername}
                    onChange={handleChange}
                    placeholder="Enter a username"
                    className="text-[26px] text-center p-1 max-w-[210px] text-black rounded-full"
                  />
                )}
                <p>{email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio mx-auto flex justify-center">
        <div className="w-[85%] sm:w-[70%]">
          <div className="flex justify-center items-center">
            <h3 className="text-center text-3xl mr-3">Portfolio</h3>
            <div className="relative">
              <Link to="/profile/add-new-listing">
                <RiAddCircleFill className="absolute left-2 top-[10px] text-gray-600 text-lg" />
                <button className="tracking-tighter pl-7 pr-5 py-2 bg-transparent border-2 text-sm text-gray-600 border-gray-500 ">
                  ADD MORE
                </button>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <Link to="/" className="text-green-300 text-center">
              Go Back Home
            </Link>
          </div>
          <div className="h-[50px] "> </div>
          <div className="h-[50px] "> </div>
          <div className="h-[50px] "> </div>
          <div className="h-[50px] "> </div>
          <div className="h-[50px] "> </div>
          <div className="h-[50px] "> </div>
          <div className="h-[50px] "> </div>
          <div className="h-[50px] "> </div>
          <div className="h-[50px] "> </div>
          <div className="h-[50px] "> </div>
          <div className="h-[50px] "> </div>
        </div>
      </div>
    </div>
  );
}
