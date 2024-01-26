import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaShare } from "react-icons/fa";
import { getAuth } from "firebase/auth";
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
import { toast } from "react-toastify";
import Contact from "../components/Contact";
import ListingActions from "../components/ListingActions";
import LocationMap from "../components/LocationMap";

export default function Listing() {
  const nav = useNavigate();
  const auth = getAuth();
  const [listing, setListing] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [shareLink, setShareLink] = useState(false);
  const [contactAgent, setContactAgent] = useState(false);
  const param = useParams();
  const position = [51.505, -0.09]

  const formatPrice = (price) => {
    return price && price !== 0 ? (
      `₦${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    ) : (
      <p className="text-gray-500 italic">Not Available</p>
    );
  };

  const contactForm = () => {
    setContactAgent(true);
  }
  
  const closeBTN = () => {
    setContactAgent(false);
  }

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

  
  
  const onEdit = (listingId) =>  {
    console.log(param.listingId);
    console.log(listing.userRef);
    nav(`/profile/listing/${listingId}/edit`);
  }

  async function onDelete(listingId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Listing?"
    );
    if (confirmed) {
      try {
        setisLoading(true);
        await deleteDoc(doc(db, "listings", listingId));
        toast.success("Listing deleted successfully!");
        nav("/profile");
      } catch (error) {
        console.error("Error deleting listing:", error);
      } finally {
        setisLoading(false);
      }
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="bg-[#fff7d1]">
      <div className="relative">
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
        <div className="absolute top-[7%] right-[5%] z-20 bg-[#fff7d1] cursor-pointer border-2 border-fuchsia-800 rounded-full w-12 h-7 flex justify-center items-center text-md text-purple-600 sm:h-12 sm:top-[70%] sm:text-2xl ">
          <FaShare
            className="text-fuchsia-800"
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
          <div className="absolute top-[17%] right-[5%] font-semibold border-2 border-fuchsia-600 rounded-md bg-[#fff7d1] z-20 p-1 text-fuchsia-600 text-sm sm:top-[87%] sm:text-md ">
            Link Copied
          </div>
        )}
      </div>

      <div className="bg-[#faedb8] flex flex-col md:flex-row max-w-6xl m-4 lg:mx-auto rounded-lg border-3 shadow-lg lg:space-x-5 z-10">
        <div className="singleList flex-1 flex-col px-8 pt-10 rounded-lg">
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
          <div className="mb-4 pt-2">
            {listing.sale ? (
              <button type="button" className="cursor-default font-semibold text-white bg-purple-700 px-4 py-2 mt-2 mr-2 rounded-md hover:bg-purple-800 disabled:opacity-50">
                Sale Price: {formatPrice(listing.sale)}
              </button>
            ) : (
              <button type="button" className="cursor-default font-light text-gray-500 bg-gray-200 px-4 py-2 mt-2 mr-2 rounded-md disabled:opacity-50 text-[13px]">
                Sale Price: Not available for Sale
              </button>
            )}

            {listing.lease ? (
              <button type="button" className="cursor-default font-semibold text-white bg-green-600 px-4 py-2 mt-2 rounded-md hover:bg-green-700 disabled:opacity-50">
                Lease Price: {formatPrice(listing.lease)}/<span className="text-xs">mon</span>
              </button>
            ) : (
              <button type="button" className="cursor-default font-light text-gray-500 bg-gray-200 px-4 py-2 mt-2 rounded-md disabled:opacity-50 text-[13px]">
                Lease Price: Not available for Lease
              </button>
            )}

          </div>
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
          <div className="mb-4 text-gray-500">
            <p className="font-semibold text-gray-600 mr-1">Description:</p>
            <p>{listing.description}</p>
          </div>


          <div className="mb-3">
            {listing.userRef === auth.currentUser?.uid ? (
              <ListingActions 
                onEdit={() => onEdit(param.listingId)} 
                onDelete={() => onDelete(param.listingId)}
              />
            ) : (
              <>
                {!contactAgent && (
                  <>
                    <em className="block text-red-400 mt-4 text-center">Interested in this property? Inquire now</em>
                    <button
                      className="border-2 border-purple-400 text-purple-700 hover:border-red-300 hover:bg-[#dbd6be] hover:text-red-600  active:border-red-300 active:bg-[#dbd6be] hover:shadow-lg font-bold py-2 px-5 w-full rounded transition ease-in-out duration-300 uppercase"
                      onClick={contactForm}
                    >
                      Contact Agent
                    </button>
                  </>
                )}
              </>

            )}
            {contactAgent && (
              <div className="relative pt-7">
                <Contact 
                  closeBTN={closeBTN}
                  userRef={listing.userRef}
                  listingName={listing.name}
                  agentData={listing.userRef}
                  onEdit={() => onEdit(listing.id)}
                  onDelete={() => onDelete(listing.id)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex-col items-stretch z-10 ">
          <LocationMap position={position} />
        </div>
      </div>
    </main>
  );
}
