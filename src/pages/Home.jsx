import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home
      <br />
      <br />
      <Link to="/profile" className="text-red-400">
        Profile link
      </Link>
    </div>
  );
}
