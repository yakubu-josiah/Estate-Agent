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
    const [currentId, setCurrentListingId] = useState(null);


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
                    // console.log(listing);
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
        return <Loader />;
    }

    const exploreMore = (id) => {
        setCurrentListingId(id);
        nav(`/profile/listing/${id}`);
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
                            <p className="absolute inline-block text-purple-950 right-0 text-[20px] bottom-2 font-bold px-2 sm:px-4 sm:text-2xl rounded-l-full max-w-[90%] bg-[#fff7d1] shadow-lg opacity-80">{agentName}</p>
                            <p className="absolute inline-block text-purple-950 right-0 text-[20px] bottom-10 sm:bottom-[41px] md:bottom-12 font-bold px-2 sm:px-4 sm:text-2xl rounded-l-full max-w-[90%] bg-[#fff7d1] shadow-lg opacity-80">{data.sale ? ( <span> Sale: {formatPrice(data.sale)} </span> ) : ( <span> Lease: {formatPrice(data.lease)} </span>)}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* {listings.map(({ id }) => ( */}
                    <div className="cursor-pointer absolute bg-[#24252785] w-full h-full top-0 z-[2]" onClick={() => exploreMore(currentId)}>
                        <div className="flex">
                            <div className="absolute bottom-[30%] md:bottom-[20%] sm:w-[70%] lg:w-[60%]">
                                <p class="block text-2xl md:pl-[7%] font-bold text-gray-300 text-center sm:text-3xl md:text-4xl">We Help To You Find The Best </p>
                                <p class="block text-2xl md:pl-[10%] font-bold text-gray-300 text-center sm:text-3xl md:text-4xl">Property For You</p>
                                <p class="block text-sm px-3 md:pl-[15%] font-light text-[#bfc0c2] text-center sm:mt-4 sm:text-base md:text-xl">Ready to move on up? Browse listings, get expert advice, and simplify your real estate journey.</p>
                            </div>
                        </div>
                    </div>
                {/* ))} */}
            </div>
        )
    );
}
