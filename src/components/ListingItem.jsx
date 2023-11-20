import React from "react";
import Moment from "react-moment";
import { ImLocation2 } from "react-icons/im";
import { Link } from "react-router-dom";

const formatPrice = (price) => {
  return price && price !== 0 ? (
    `₦${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  ) : (
    <p>Not Available</p>
  );
};

export default function ListingItem({ listing, listingId }) {
  return (
    <li>
      <Link to={`/category/${listing.type}/${listingId}`}>
        <img src={listing.images[0]} alt="" />
        <Moment fromNow>{listing.timestamp?.toDate()}</Moment>
        <div className="">
          <ImLocation2 />
          <p>{listing.address}</p>
        </div>
        <h3>{listing.name}</h3>
        {listing.sale && <p>Sale Price - {formatPrice(listing.sale)}</p>}
        {listing.lease && <p>Lease Price - {formatPrice(listing.lease)}</p>}
      </Link>
    </li>
  );
}
