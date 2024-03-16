import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, collection, getDocs, getDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Loader from "../components/Loader";

import { Swiper, SwiperSlide } from "swiper/react";
import {
    A11y,
    EffectFade,
    Autoplay,
} from "swiper/modules";
import "swiper/swiper-bundle.css";

export default function HeroBanner() {
    const nav = useNavigate();
    const [listings, setListings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [agentName, setAgentName] = useState('');
    const [currentListingId, setCurrentListingId] = useState(null);


    const formatPrice = (price) => {
        return price && price !== 0 ? (
          `₦${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        ) : (
          <p className="text-gray-500 italic">Not Available</p>
        );
    };

    useEffect(() => {
        async function fetchListings() {
            try {
                const listingRef = collection(db, "listings");
                const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
                const querySnap = await getDocs(q);
                const fetchedListings = [];

                for (const doc of querySnap.docs) {
                    const listingData = doc.data();
                    fetchedListings.push({
                      id: doc.id,
                      data: listingData,
                      userRef: listingData.userRef, 
                    });
                }

                const userDocRefs = fetchedListings.map(listing => doc(db, "users", listing.userRef));
                const userDocs = await Promise.all(userDocRefs.map(getDoc));
                
                const listingsWithOwners = fetchedListings.map((listing, index) => {
                    const userData = userDocs[index].data();
                    return {
                        ...listing,
                        agentName: userData.username, 
                    };
                });

                setListings(listingsWithOwners);
                setAgentName(agentName);
                setIsLoading(false);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchListings();
    }, [agentName]);

    if (isLoading) {
        return  <div className="flex justify-center items-center bg-[#3a3a3a] h-[410px] ">
                    <div className="h-[10px] loading-container items-center align-middle flex justify-center">
                        <span className="spinner mt-0 text-white mr-3"></span>
                        <p className="letter-text font-bold">Loading....</p>
                    </div>
                </div>;
        // return <div className="loading"><Loader className=" h-[300px]" /></div>;
    }

    const exploreMore = (id) => {
        nav(`/profile/listing/${id}`);
    };

    const handleListingChange = (id) => {
        setCurrentListingId(id);
    };

    if (!listings || listings.length === 0) {
        return <></>;
    }
    return (
        listings && (
            <div className="relative">
                <Swiper
                    modules={[
                        A11y,
                        EffectFade,
                        Autoplay,
                    ]}
                    slidesPerView={1}
                    effect="fade"
                    autoplay={{ delay: 4000 }}
                    onSlideChange={(swiper) => handleListingChange(listings[swiper.realIndex].id)}
                >
                    {listings.map(({ data, id, agentName }) => (
                        <SwiperSlide key={id} onClick={() => exploreMore(id)}>
                            <div
                                style={{
                                    background: `url(${data.images[0]}) center no-repeat`,
                                    backgroundSize: "cover",
                                    width: "100%",
                                }}
                                className="herobanner w-full h-[300px] "
                            >
                            <p className="absolute inline-block text-white right-0 text-[20px] bottom-2 font-bold px-2 sm:px-4 sm:text-2xl rounded-l-full max-w-[90%] bg-green-700 shadow-lg opacity-80">{agentName}</p>
                            <p className="absolute inline-block text-white right-0 text-[20px] bottom-10 sm:bottom-[41px] md:bottom-12 font-bold px-2 sm:px-4 sm:text-2xl rounded-l-full max-w-[90%] bg-green-700 shadow-lg opacity-80">{data.sale ? ( <span> Sale: {formatPrice(data.sale)} </span> ) : ( <span> Lease: {formatPrice(data.lease)} </span>)}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                    <div className="absolute bg-[#24252785] w-full h-full top-0 z-[2]">
                        <div className="flex">
                            <div className="absolute bottom-[30%] md:bottom-[20%] sm:w-[70%] lg:w-[60%]">
                                <p class="block text-2xl md:pl-[7%] font-bold text-gray-300 text-center sm:text-3xl md:text-4xl">We Help To You Find The Best </p>
                                <p class="block text-2xl md:pl-[10%] font-bold text-gray-300 text-center sm:text-3xl md:text-4xl">Property For You</p>
                                <p class="block text-sm px-3 md:pl-[15%] font-light text-[#bfc0c2] text-center sm:mt-4 sm:text-base md:text-xl">Ready to move on up? Browse listings, get expert advice, and simplify your real estate journey.</p>
                                {currentListingId && (
                                    <div className="block">
                                        <button 
                                            className="mt-8 px-4 py-2 bg-green-800 text-gray-300 font-bold rounded-md shadow-md hover:bg-green-600 sm:text-lg md:text-xl lg:text-2xl"
                                            onClick={() => nav(`profile/listing/${currentListingId}`)}>
                                        View Details
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
            </div>
        )
    );
}
