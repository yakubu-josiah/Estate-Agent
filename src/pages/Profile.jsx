import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="">
      <p>Here Goes The Profile Page For Authenticated User...</p>
      <br />
      <br />
      <Link to="/" className="text-red-300">
        Go Back Home
      </Link>
    </div>
  );
}
