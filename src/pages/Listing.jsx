import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
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
import Loader from "../components/Loader";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [isLoading, setisLoading] = useState(true);
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
    </main>
  );
}
