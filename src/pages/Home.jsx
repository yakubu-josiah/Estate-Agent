import React from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function Home() {
  return (
    <div>
      Home
      <br />
      <br />
      <Link to="/profile" className="text-red-400">
        Profile link
      </Link>
      <Loader />
    </div>
  );
}
