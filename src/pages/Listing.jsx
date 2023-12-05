import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaShare } from "react-icons/fa";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import Loader from "../components/Loader";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [sharedLink, setSharedLink] = useState(false);
  const param = useParams();

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", param.listingId);
      const listingData = await getDoc(docRef);
      if (listingData.exists()) {
        setListing(listingData.data());
        setisLoading(false);
        console.log(listingData.data());
      }
      return;
    }
    fetchListing();
  }, [param.listingId]);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <main>
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
        pagination={{ clickable: true, type: "progressbar" && "fraction" }}
        scrollbar={{ draggable: true }}
      >
        {listing.images.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className="w-full overflow-hidden h-[300px]"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                background: `url(${listing.images[i]}) center no-repeat`,
                height: `300px`,
                width: "100%",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="fixed top-[13%] right-[3%] z-10 bg-[#fff7d1] cursor-pointer border-2 border-purple-600 rounded-full w-12 h-7 flex justify-center items-center text-md text-purple-600 sm:h-12 sm:top-[40%] sm:text-2xl ">
        <FaShare
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setSharedLink(true);
            setTimeout(() => {
              setSharedLink(false);
            }, 2000);
          }}
        />
      </div>
      {sharedLink && (
        <div className="fixed top-[20%] right-[3%] font-semibold border-2 border-purple-300 rounded-md bg-[#fff7d1] z-10 p-1 text-purple-600 text-sm sm:top-[48%] sm:text-md ">
          Link Copied
        </div>
      )}
    </main>
  );
}
