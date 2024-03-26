import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { getAuth } from "firebase/auth";
import { MdAdd } from "react-icons/md";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ListingItem from "../../components/ListingCard";
import { toast } from "react-toastify";
import EditProfile from "../../components/EditProfile";
import Footer from "../../components/Footer";

export default function Profile() {
  const auth = getAuth();
  const nav = useNavigate();
  const [listings, setListings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthStatus();
  const username = user ? user.displayName : "Unknown User";


  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
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
        toast.error("Network error, try again.");
      }
    }
  }
  return (
    <>
      <div className="profileCont bg-[#fff7d1] min-h-screen overflow-hidden pb-10">
        <EditProfile />
        <div className="portfolio mx-auto flex justify-center mb-10">
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
            </div>  
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
