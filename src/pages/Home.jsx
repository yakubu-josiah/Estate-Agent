import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import Loader from "../components/Loader";
import HeroBanner from "../components/HeroBanner";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";


export default function Home() {
  
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

        console.log("Sale: ", saleListings);
        console.log("Lease: ", leaseListings);
        console.log("All Offers: ", allOffersListings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    } 
    fetchListings()
  }, [])
  
  
  
  return (
    <div>
      <HeroBanner />
      <p className="text-center">More coming....</p>
      <Loader />

    </div>
  );
}
