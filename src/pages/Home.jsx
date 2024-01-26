import React from "react";
import HeroBanner from "../components/HeroBanner";
import Loader from "../components/Loader";


export default function Home() {
  
  return (
    <div>
      <HeroBanner />
      <p className="text-center">More coming....</p>
      <Loader />

    </div>
  );
}
