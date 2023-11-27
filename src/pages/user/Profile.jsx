import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { getAuth, updateProfile } from "firebase/auth";
import { RiAddCircleFill } from "react-icons/ri";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ListingItem from "../../components/ListingItem";
import { toast } from "react-toastify";

export default function Profile() {
  const auth = getAuth();
  const nav = useNavigate();
  const [editPhoto, setEditPhoto] = useState(true);
  const [listings, setListings] = useState(null);
  const [isLoading, setisLoading] = useState(true);

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
    setEditPhoto(false);
    console.log("Clicked!!");
  };
  const saveForm = async () => {
    try {
      if (username !== formData.formUsername) {
        await updateProfile(auth.currentUser, {
          displayName: formData.formUsername,
        });
        setEditPhoto(true);
        console.log("Profile updated successfully!");
      }
      setEditPhoto(true);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      formUsername: username,
    }));
    async function fetchListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setisLoading(false);
    }
    fetchListings();
  }, [username, auth.currentUser.uid]);

  function onEdit(listingId) {
    nav(`/profile/listing/${listingId}/edit`);
  }
  async function onDelete(listingId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Listing?"
    );
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "listings", listingId));
        const updatedListings = listings.filter(
          (listing) => listing.id !== listingId
        );
        setListings(updatedListings);
        toast.success("Listing deleted successfully!!");
      } catch (error) {
        console.error("Error deleting listing:", error);
      }
    }
  }
  return (
    <div className="profileCont background mb-0">
      <div>
        <div className="imgCont h-[200px] w-full">
          <div className="relative">
            <div className="image ml-9 mt-12 flex ">
              <div
                id="img"
                className="rounded-md row-auto h-[200px] w-[200px] mr-9 space-y-3 border-4 border-white shadow-lg"
              >
                <div className="bg-red-400 w-full h-full"></div>
                {editPhoto ? (
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
              <div className="text-gray-300 rounded-md flex flex-col items-center justify-center pt-3">
                {editPhoto ? (
                  <h5 className="text-4xl mb-0">{username}</h5>
                ) : (
                  <input
                    type="text"
                    name="formUsername"
                    value={formData.formUsername}
                    onChange={handleChange}
                    placeholder="Enter a username"
                    className="text-[26px] text-center p-1 max-w-[210px] text-gray-600 rounded-full"
                  />
                )}
                <p>{email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio mx-auto flex justify-center">
        <div>
          <div className="flex justify-center items-center mt-4 mb-2 align-middle">
            <h3 className="text-center text-purple-800 font-bold lg:text-3xl text-2xl mr-3">
              All Listings
            </h3>
            <div className="relative">
              <Link to="/profile/add-new-listing" className="mx-1">
                <RiAddCircleFill className="absolute left-2 top-2 text-gray-600 text-lg" />
                <button className="tracking-tighter rounded-lg">
                  ADD MORE
                </button>
              </Link>
            </div>
          </div>
          <div className="">
            {" "}
            {!isLoading && listings.length > 0 && (
              <>
                <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6">
                  {listings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      listingId={listing.id}
                      listing={listing.data}
                      onDelete={() => onDelete(listing.id)}
                      onEdit={() => onEdit(listing.id)}
                    />
                  ))}
                </ul>
              </>
            )}{" "}
            {!isLoading && listings.length > 0 && (
              <>
                <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6">
                  {listings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      id={listing.id}
                      listing={listing.data}
                    />
                  ))}
                </ul>
              </>
            )}{" "}
            {!isLoading && listings.length > 0 && (
              <>
                <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6">
                  {listings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      id={listing.id}
                      listing={listing.data}
                    />
                  ))}
                </ul>
              </>
            )}{" "}
            {!isLoading && listings.length > 0 && (
              <>
                <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6">
                  {listings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      id={listing.id}
                      listing={listing.data}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="text-center">
            <Link to="/" className="text-green-300 text-center">
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
