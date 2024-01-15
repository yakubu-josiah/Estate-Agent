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
import { ImLocation2 } from "react-icons/im";
import Moment from "react-moment";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [shareLink, setShareLink] = useState(false);
  const param = useParams();

  const formatPrice = (price) => {
    return price && price !== 0 ? (
      `₦${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    ) : (
      <p className="text-gray-500 italic">Not Available</p>
    );
  };

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
    <main className="bg-[#fff7d1]">
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
      <div className="absolute top-[13%] right-[3%] z-10 bg-[#fff7d1] cursor-pointer border-2 border-purple-600 rounded-full w-12 h-7 flex justify-center items-center text-md text-purple-600 sm:h-12 sm:top-[40%] sm:text-2xl ">
        <FaShare
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLink(true);
            setTimeout(() => {
              setShareLink(false);
            }, 2000);
          }}
        />
      </div>
      {shareLink && (
        <div className="absolute top-[20%] right-[3%] font-semibold border-2 border-purple-300 rounded-md bg-[#fff7d1] z-10 p-1 text-purple-600 text-sm sm:top-[48%] sm:text-md ">
          Link Copied
        </div>
      )}

      <div className="bg-[#faedb8] flex flex-col md:flex-row max-w-6xl m-4 lg:mx-auto rounded-lg border-3 shadow-lg lg:space-x-5 ">
        <div className="w-full singleList px-8 pt-10 rounded-lg">
          <div className="flex-col sm:flex-row items-center truncate">
          <div className="relative inline-block mb-2">
            <div className="absolute top-0.5 left-[98%] w-[0.29rem] transform bg-red-600 opacity-60 h-[28px]"></div>
            <Moment
              className="text-sm moment uppercase bg-[#dbd6be] py-1 px-3 rounded-tl-full relative z-10 text-red-600 tracking-widest"
              format="Do MMMM YYYY"
            >
              {listing.timestamp?.toDate()}
            </Moment>
            </div>
            <p className="text-2xl font-semibold text-purple-700">
              {listing.name} 
            </p>
          </div>

          {listing.sale ? (
            <p className="text-gray-500 pl-3">
              <span className="font-semibold text-gray-600">Sale Price: </span>
              {formatPrice(listing.sale)}
            </p>
          ) : (
            <p className="">
              <span className="font-semibold text-gray-600">Sale Price: </span>{" "}
              Not available for Sale...
            </p>
          )}

          {listing.lease ? (
            <p className="text-gray-500 pl-3">
              <span className="font-semibold text-gray-600">Lease Price: </span>
              {formatPrice(listing.lease)}
            </p>
          ) : (
            <p className="">
              <span className="font-semibold text-gray-600">Lease Price: </span>{" "}
              Not available for Lease...
            </p>
          )}
          <div className="mb-4 "></div>
          <p className="text-2xl font-semibold mb-2 text-purple-700">
            Property Details
          </p>
          <div className="mb-4 pl-3 text-gray-500">
            <div className="flex items-center">
              <p className="font-semibold text-gray-600 mr-2">Size:</p>
              <p>{listing.size}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold text-gray-600 mr-2">Dimension:</p>
              <p>{listing.dimension}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold text-gray-600 mr-2">Property Type:</p>
              <p>{listing.type}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold text-gray-600 mr-2">Category:</p>
              <p> {listing.category}</p>
            </div>
          </div>

          <p className="text-2xl font-semibold mb-2 text-purple-700">
            Property Location
          </p>
          <div className="mb-4 pl-0 text-gray-500 truncate">
            <div className="flex items-center">
              <p className="font-semibold text-gray-600 mr-2">City:</p>
              <p>
                {listing.city}, {listing.state}
              </p>
            </div>
            <div className="flex items-center ">
              <ImLocation2 className="h-4 w-4 text-red-500" />
              <p className="font-semibold text-gray-600 mr-2">Address:</p>
              <p>{listing.address}</p>
            </div>
          </div>
          <p className="text-2xl font-semibold mb-2 text-purple-700">
            Property Description
          </p>
          <div className="pl-0 mb-1 text-gray-500 truncate">
            <div className="flex items-center">
              <p className="font-semibold text-gray-600 mr-2">Type:</p>
              <p>
                {listing.type}
              </p>
            </div>
          </div>          
          {/* ... (add more details as needed) */}
          <div className="mb-4 text-gray-500">
            <p className="font-semibold text-gray-600 mr-1">Description:</p>
            <p>{listing.description}</p>
          </div>
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg-[400px] mt-3 z-10 overflow-x-hidden"></div>
      </div>
    </main>
  );
}
