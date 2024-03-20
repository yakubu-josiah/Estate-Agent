import React, { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { FiChevronsDown } from "react-icons/fi";
import ListingItem from '../components/ListingItem';

export default function Offers() {
  const [isLoading, setIsLoading] = useState(true);
  const [allOffersListings, setAllOffersListings] = useState([]);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);


  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const allOffersQuery = query(listingRef, orderBy("timestamp", "asc"), limit(4));
        const allOffersSnap = await getDocs(allOffersQuery);

        const lastIndexListing = allOffersSnap.docs[allOffersSnap.docs.length - 1]
        setLastFetchedListing(lastIndexListing);

        const allOffersListingsData = allOffersSnap.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }));
        
        setAllOffersListings(allOffersListingsData);
      } catch (error) {
        toast.error("Network error, please refresh the page.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchListings();
  }, []);


  async function fetchMore() {
    try {
      const listingRef = collection(db, "listings");
      const allOffersQuery = query(listingRef, orderBy("timestamp", "asc"), startAfter(lastFetchedListing), limit(4));
      const allOffersSnap = await getDocs(allOffersQuery);

      const lastIndexListing = allOffersSnap.docs[allOffersSnap.docs.length - 1]
      setLastFetchedListing(lastIndexListing);

      const allOffersListingsData = allOffersSnap.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));
      
      setAllOffersListings((prevState) => [...prevState, ...allOffersListingsData]);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full bg-[#fff7d1] ">
      <div className="relative mt-0 w-full h-[170px] sm:h-[200px] flex justify-center">
        <img
          src={process.env.PUBLIC_URL + "/images/offers.webp"}
          alt=""
          className="inset-0 object-cover bg-fixed h-[140px] w-full"
        />
        <div className="absolute w-[90%] md:w-[70%] h-[66px] sm:h-[85px] sm:top-[100px] top-[105px] flex align-middle text-gray-600 justify-between items-center py-5 px-5 sm:px-8 bg-gradient-to-b rounded-md from-[#f5d347] to-[#d3d3d3] z-10">
          <h4 className="text-md sm:text-xl text-center font-bold w-full p-1 border-r-2 h-full flex justify-center items-center">ALL OFFERS LISTING</h4>
          <div className="w-[90%] text-sm md:text-base sm:w-full text-center p-1 flex justify-center items-center">
            <p>LANDS DEALS NG REALTOR TEAM</p>
          </div> 
        </div>
      </div>     
      <div className="block text-center mt-10 mx-6 sm:mx-14">
        <h1 className="text-xl text-center sm:text-3xl font-bold w-full text-gray-600 sm:my-5">Trained Real Estate Professionals with over 23 Years of Experience</h1>
        <p className="hidden mt-3 text-ellipsis w-full md:flex justify-center text-gray-500">
          Our team has set the standard of excellence in Nigeria real estate. In different parts of the state, 
          we commonly service in Lagos Nigeria but we often travel out into many other states across the country, 
          specializing in both Residential and Commercial Real Estate. Our team is passionate about our clients' goals, 
          and aim to treat each client as if they were our only one. Together, you next real estate experience will not 
          only be enjoyable but also produce great results! Please feel free to give us a call, or send and email anytime 
          and we will contact you as soon as possible.
          specializing in both Residential and Commercial Real Estate.
        </p>
        <p className="md:hidden mt-3 text-xs sm:text-sm text-ellipsis w-full flex justify-center text-gray-500"> Our team is passionate about our clients' goals, 
        and aim to treat each client as if they were our only one. Together, you next real estate experience will not 
        only be enjoyable but also produce great results! Please feel free to give us a call, or send and email anytime 
        and we will contact you as soon as possible.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-12">
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
        </div>
      ) : (
        <div className="flex justify-center mt-12">
          <div>            
            <div className="relative h-auto overflow-hidden px-8">
              <div className="absolute inset-0 bg-gradient-to-b from-[#ece0ac] to-transparent opacity-50 z-1"></div>
                
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6">
                {allOffersListings !== null &&
                    allOffersListings.map((listing) => (
                      <ListingItem
                        key={listing.id}
                        listingId={listing.id}
                        listing={listing.data}
                      />
                    )
                  )
                }
              </ul>

            </div>
          </div>
        </div>
      )}
      {lastFetchedListing && (
        <div className="w-full flex justify-center my-10">
          <div className="relative hover:underline bg-green-600 min-w-[150px] max-w-[400px] hover:text-white text-gray-300 sm:w-full font-bold rounded-md shadow-md hover:bg-green-800">
            <button onClick={fetchMore} className="block mx-0 py-1 pr-3 w-full sm:text-lg md:text-xl transition-all ease-in-out duration-300">
              Load More
            </button>
            <FiChevronsDown className="absolute right-0 sm:right-28 top-1 sm:top-2 bottom-2 text-2xl mx-3 hover:underline" />
          </div>
        </div>
      )}
    </div>
  );
}
