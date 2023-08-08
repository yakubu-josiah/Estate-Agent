import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { SlLogout } from "react-icons/sl";

export default function Header() {
  const location = useLocation();
  const nav = useNavigate();
  function checkRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  const auth = getAuth();
  const { isLoggedIn } = useAuthStatus();

  const [showNavbar, setShowNavbar] = useState(true);
  const [isNavbarAtTop, setIsNavbarAtTop] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const onSignOut = async () => {
    try {
      await signOut(auth);
      console.log("user logged out");
      nav("/");
    } catch (error) {
      console.log("Error occurred during logout:", error);
    }
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setIsNavbarAtTop(currentScrollPos <= 0);

    if (currentScrollPos > prevScrollPos) {
      setShowNavbar(currentScrollPos > -100 % +window.innerHeight);
    } else {
      setShowNavbar(false);
    }

    setPrevScrollPos(currentScrollPos);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div
      className={`${showNavbar ? "sticky" : "hide"} ${
        isNavbarAtTop
          ? "headbar border-b shadow-md top-0 z-50"
          : "bg-transparent border-b shadow-md top-0 z-50"
      } border-b shadow-md top-0 z-50 transition duration-500 ease-in-out`}
    >
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div className="header">
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="Our Logo"
            className="cursor-pointer py-2"
            onClick={() => {
              nav("/");
            }}
          />
        </div>
        <div className="">
          <ul className="flex space-x-4 md:space-x-7 lg:space-x-10">
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                        ${checkRoute("/") && "header-active"}`}
              onClick={() => {
                nav("/");
              }}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                        ${checkRoute("/offers") && "header-active"}`}
              onClick={() => {
                nav("/offers");
              }}
            >
              Offers
            </li>

            {isLoggedIn ? (
              <>
                <li
                  className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                            ${checkRoute("/profile") && "header-active"}`}
                  onClick={() => {
                    nav("/profile");
                  }}
                >
                  Profile
                </li>

                <li
                  className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                          ${checkRoute("/auth/sign-in") && "header-active"}`}
                  onClick={onSignOut}
                >
                  Logout <SlLogout className="mr-1 text-md inline" />
                </li>
              </>
            ) : (
              <li
                className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
                        ${checkRoute("/auth/sign-in") && "header-active"}`}
                onClick={() => {
                  nav("/auth/sign-in");
                }}
              >
                Sign in
              </li>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}
