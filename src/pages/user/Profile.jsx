import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { getAuth, updateProfile } from "firebase/auth";
import { MdAdd } from "react-icons/md";
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
    setisLoading(true);
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

  //  DELETE FUNCTION HERE
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
                <div className="bg-red-300 w-full h-full"></div>
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
              <Link to="/profile/add-new-listing" className="group space-x-2">
                <MdAdd className="absolute left-4 top-[5px] text-gray-600 text-lg transition-transform group-active:translate-y-1" />
                <button className="tracking-tighter rounded-lg">
                  Add more
                </button>
              </Link>
            </div>
          </div>
          <div>
            {isLoading ? (
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 my-6">
                {[...Array(4)].map((_, index) => (
                  <li
                    key={index}
                    className="relative flex flex-col bg-[#faf5de] justify-between m-[10px] shadow-md hover:shadow-2xl overflow-hidden transition-shadow loader-listing"
                  >
                    <p className="letter-text font-bold text-black top-10">
                      Loading....
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6">
                {listings &&
                  listings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      listingId={listing.id}
                      listing={listing.data}
                      onDelete={() => onDelete(listing.id)}
                      onEdit={() => onEdit(listing.id)}
                      isOwner={listing.data.userRef === auth.currentUser.uid}
                    />
                  ))}
              </ul>
            )}
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
