import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import HeroBanner from "../components/HeroBanner";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import ListingItem from "../components/ListingItem";


export default function Home() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [saleListings, setSaleListings] = useState(null);
  const [leaseListings, setLeaseListings] = useState(null);
  const [allOffersListings, setAllOffersListings] = useState(null);


  useEffect(() => {
    async function fetchListings() {
      
      try {
        const listingRef = collection(db, "listings");

        // Fetch sale listings
        const saleQuery = query(listingRef, where("sale", "!=", ""), orderBy("sale"), orderBy("timestamp", "desc"), limit(4));
        const saleSnapshot = await getDocs(saleQuery);
        const saleListingsData = saleSnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }));
        setSaleListings(saleListingsData);

        // Fetch Lease listings
        const leaseQuery = query(listingRef, where("lease", "!=", ""), orderBy("lease"), orderBy("timestamp", "desc"), limit(4));
        const leaseSnapshot = await getDocs(leaseQuery);
        const leaseListingsData = leaseSnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }));
        setLeaseListings(leaseListingsData);

        // Fetch All Offers listings
        const allOffersQuery = query(listingRef, orderBy("timestamp", "asc"), limit(4));
        const allOffersSnapshot = await getDocs(allOffersQuery);
        const allOffersListingsData = allOffersSnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }));
        setAllOffersListings(allOffersListingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }

    } 
    fetchListings()
  }, [])
  
  return (
    <div>
      <HeroBanner />
      <div className="w-full h-full bg-[#fff7d1]">
        <div className="hero bg-cover bg-center">
          <div className="container mx-auto px-4 py-10 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-600 text-center sm:text-5xl md:text-6xl lg:text-7xl">Your Dream Land Is Here</h1>
            <p className="text-xl text-gray-400 text-center mt-4 sm:text-2xl md:text-3xl lg:text-4xl">Explore a curated selection of properties, perfect for your next adventure.</p>
          </div>
        </div>
        <div className="flex justify-center mb-9">
          <div>
            <div className="relative overflow-hidden container w-full sm:w-fit">
              <div className="mt-2 sm:mt-4 absolute h-[50%] sm:rounded-br-xl inset-0 bg-gradient-to-b from-transparent opacity-70 to-pink-500 z-1"></div>
              {/* <div className=" px-4 py-8 h-full w-fit text-center"> */}
              <h1 className="z-2 w-auto text-base h-full sm:text-2xl pr-3 font-bold text-center sm:text-end text-gray-400 leading-tight">Browse Available Properties for Sale</h1>
                {/* <p class="mt-2 text-lg">Optional Subheading Text</p>
              </div> */}
            </div>
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
                <div className="flex justify-center">
                  <div>
                    
                    <div class="relative h-auto overflow-hidden px-8">
                      <div class="absolute inset-0 bg-gradient-to-b from-[#ece0ac] to-transparent opacity-50 z-1"></div>
                        
                      <ul>
                        <li className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6">
                          {saleListings !== null &&
                            saleListings.map((listing) => (
                              <ListingItem
                                key={listing.id}
                                listingId={listing.id}
                                listing={listing.data}
                              />
                            ))}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>
        
        
        <div className="flex justify-center mb-9">
          <div>
            <div className="relative overflow-hidden container w-full sm:w-fit">
              <div className="mt-2 sm:mt-4 absolute h-[50%] sm:rounded-br-xl inset-0 bg-gradient-to-b from-transparent opacity-70 to-pink-500 z-1"></div>
              {/* <div className=" px-4 py-8 h-full w-fit text-center"> */}
              <h1 className="z-2 w-auto text-base h-full sm:text-2xl pr-3 font-bold text-center sm:text-end text-gray-400 leading-tight">Browse Available Properties for Lease</h1>
                {/* <p class="mt-2 text-lg">Optional Subheading Text</p>
              </div> */}
            </div>
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
                <div className="flex justify-center">
                  <div>
                    
                    <div class="relative h-auto overflow-hidden px-8">
                      <div class="absolute inset-0 bg-gradient-to-b from-[#ece0ac] to-transparent opacity-50 z-1"></div>
                        
                      <ul>
                        <li className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6">
                          {leaseListings !== null &&
                            leaseListings.map((listing) => (
                              <ListingItem
                                key={listing.id}
                                listingId={listing.id}
                                listing={listing.data}
                              />
                            ))}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>

        <div className="flex justify-center ">
          <div>
            <div className="relative overflow-hidden container w-full sm:w-fit">
              <div className="mt-2 sm:mt-4 absolute h-[50%] sm:rounded-br-xl inset-0 bg-gradient-to-b from-transparent opacity-70 to-pink-500 z-1"></div>
              <h1 className="z-2 w-auto text-base h-full sm:text-2xl pr-3 font-bold text-center sm:text-end text-gray-400 leading-tight">Browse Available Properties All Offers</h1>
            </div>
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
                <div className="flex justify-center">
                  <div>
                    
                    <div class="relative h-auto overflow-hidden px-8">
                      <div class="absolute inset-0 bg-gradient-to-b from-[#ece0ac] to-transparent opacity-50 z-1"></div>
                        
                      <ul>
                        <li className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6">
                          {allOffersListings !== null &&
                            allOffersListings.map((listing) => (
                              <ListingItem
                                key={listing.id}
                                listingId={listing.id}
                                listing={listing.data}
                              />
                            ))}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
