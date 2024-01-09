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
      <p className="text-gray-600 italic">Not Available</p>
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

      <div className="bg-[#eee3d3] flex flex-col md:flex-row max-w-6xl m-4 lg:mx-auto rounded-lg border-3 shadow-lg lg:space-x-5 ">
        <div className="w-full singleList px-8 pt-10 rounded-lg">
          <div className="flex items-center truncate">
            <p className="text-2xl font-semibold mb-2 text-purple-700">
              {listing.name} -{" "}
            </p>
            <Moment
              className="text-gray-700 text-md moment uppercase sm:block"
              calendar
            >
              {listing.timestamp?.toDate()}
            </Moment>
          </div>

          {listing.sale ? (
            <p className="text-gray-600 pl-5">
              <span className="font-semibold text-gray-800">Sale Price: </span>
              {formatPrice(listing.sale)}
            </p>
          ) : (
            <p className="">
              <span className="font-semibold text-gray-800">Sale Price: </span>{" "}
              Not available for Sale...
            </p>
          )}

          {listing.lease ? (
            <p className="text-gray-600 pl-5">
              <span className="font-semibold text-gray-800">Lease Price: </span>
              {formatPrice(listing.lease)}
            </p>
          ) : (
            <p className="">
              <span className="font-semibold text-gray-800">Lease Price: </span>{" "}
              Not available for Lease...
            </p>
          )}
          <div className="mb-4 "></div>
          <p className="text-2xl font-semibold mb-2 text-purple-700">
            Property Details
          </p>
          <div className="mb-4 pl-5 text-gray-600">
            <div className="flex items-center">
              <p className="font-semibold text-gray-800">Size:</p>
              <p>{listing.size}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold text-gray-800">Dimension:</p>
              <p>{listing.dimension}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold text-gray-800">Property Type:</p>
              <p>{listing.type}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold text-gray-800">Category:</p>
              <p>{listing.category}</p>
            </div>
          </div>

          <p className="text-2xl font-semibold mb-2 text-purple-700">
            Property Location
          </p>
          <div className="mb-4 pl-0 text-gray-600 truncate">
            <div className="flex items-center">
              <p className="font-semibold text-gray-800 mr-1">City:</p>
              <p>
                {listing.city}, {listing.state}
              </p>
            </div>
            <div className="flex items-center ">
              <ImLocation2 className="h-4 w-4 text-red-500" />
              <p className="font-semibold text-gray-800">Address:</p>
              <p className="ml-1">{listing.address}</p>
            </div>
          </div>
          <div className="mb-4"></div>
          <div className="mb-4">
            <p className="font-semibold">Type:</p>
            <p>{listing.type}</p>
          </div>
          {/* ... (add more details as needed) */}
          <div className="mb-4">
            <p className="font-semibold">Description:</p>
            <p>{listing.description}</p>
          </div>
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg-[400px] mt-3 z-10 overflow-x-hidden"></div>
      </div>
    </main>
  );
}
