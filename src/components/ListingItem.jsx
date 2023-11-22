import React from "react";
import Moment from "react-moment";
import { ImLocation2 } from "react-icons/im";
import { Link } from "react-router-dom";

const formatPrice = (price) => {
  return price && price !== 0 ? (
    `₦${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  ) : (
    <p className="text-gray-600 italic">Not Available</p>
  );
};

export default function ListingItem({ listing, listingId }) {
  return (
    <li className="relative flex flex-col justify-between m-[10px] items-center shadow-md p-0 hover:shadow-2xl rounded-md overflow-hidden transition-shadow duration-150">
      <Link className="contents" to={`/category/${listing.type}/${listingId}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-110 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.images[0]}
          alt=""
        />
        <Moment
          className="absolute top-2 right-2 bg-[#3ae4f0] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <h3 className="font-semibold text-lg text-center mt-0 text-[#2eb0b9]">
            {listing.name}
          </h3>
          <div className="flex items-center space-x-1">
            <ImLocation2 className="h-4 w-4 text-red-500" />
            <p className="font-bold text-sm mb-[1px] text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          {listing.sale && (
            <p className="font-bold text-xs text-gray-600">
              Sale Price - {formatPrice(listing.sale)}
            </p>
          )}
          {listing.lease && (
            <p className="font-bold text-xs text-gray-600">
              Lease Price - {formatPrice(listing.lease)}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}
