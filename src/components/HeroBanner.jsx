import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Loader from "../components/Loader";

import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    EffectFade,
    Autoplay,
} from "swiper/modules";
import "swiper/swiper-bundle.css";

export default function HeroBanner() {
    const nav = useNavigate();
    const [listings, setListings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const formatPrice = (price) => {
        return price && price !== 0 ? (
          `₦${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        ) : (
          <p className="text-gray-500 italic">Not Available</p>
        );
    };



    useEffect(() => {
        async function fetchLising() {
            const listingRef = collection(db, "listings");
            const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
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
        fetchLising();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    const exploreMore = (listingId) => {
        nav(`/profile/listing/${listingId}`);
    };

    if (!listings || listings.length === 0) {
        return <></>;
    }
    return (
        listings && (
            <>
                <Swiper
                    modules={[
                        Navigation,
                        Scrollbar,
                        Pagination,
                        A11y,
                        EffectFade,
                        Autoplay,
                    ]}
                    slidesPerView={1}
                    navigation
                    effect="fade"
                    autoplay={{ delay: 4000 }}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {listings.map(({ data, id }) => (
                        <SwiperSlide key={id} onClick={() => exploreMore(id)}>
                            <div
                                style={{
                                    background: `url(${data.images[0]}) center no-repeat`,
                                    backgroundSize: "cover",
                                    width: "100%",
                                    height: "300px",
                                }}
                                className="relative w-full h-[300px]"
                            >
                            <p className="absolute text-purple-700 right-0 top-2 font-bold px-2 rounded-l-full max-w-[90%] bg-[#fff7d1] shadow-lg opacity-80 ">{data.name}</p>
                            <p className="absolute text-purple-700 left-0 bottom-2 font-bold px-2 rounded-r-full max-w-[90%] bg-[#fff7d1] shadow-lg opacity-80 ">{data.sale ? ( <span> Sale: {formatPrice(data.sale)} </span> ) : ( <span> Lease: {formatPrice(data.lease)} </span>)}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    );
}
