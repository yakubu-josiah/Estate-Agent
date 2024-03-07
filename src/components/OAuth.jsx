import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OAuth() {
  const nav = useNavigate();
  const auth = getAuth();


  const handleSignIn = async (provider) => {
    try {
      let account = await signInWithPopup(auth, provider);
      let user = account.user;
      let dataRef = doc(db, "users", user.uid);
      let dataSnap = await getDoc(dataRef);
      if (!dataSnap.exists()) {
        await setDoc(dataRef, {
          username: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photo: user.photoURL,
          timestamp: Timestamp.fromDate(new Date()),
        });
      }
      nav("/profile");
    } catch (error) {
        if (error.code === "auth/popup-closed-by-user") {
          toast.error("Oh try again! Closed authentication popup");
        } else {
          toast.error("Opps! Network error, try again.");
        }
    }
  };


  const OAuthFacebook = () => {
    let provider = new FacebookAuthProvider();
    handleSignIn(provider);
  };

  const OAuthGoogle = () => {
    let provider = new GoogleAuthProvider();
    handleSignIn(provider);
  };

  const OAuthTwitter = () => {
    let provider = new TwitterAuthProvider();
    handleSignIn(provider);
  };


  return (
    <div className="flex justify-center items-center">
      <div className="w-full">
        <div className="flex mx-auto items-center my-4 w-[80%] uppercase gap-[7px] whitespace-nowrap">
          <div className="w-full">
            <hr className="authhr" />
          </div>

          <p className="text-center text-[10px] sm:text-sm">
            Or continue using
          </p>
          <div className="w-full">
            <hr className="authhr" />
          </div>
        </div>
        <div className="flex justify-center text-4xl">
          <FaFacebookF
            className="rounded-full p-1 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all"
            onClick={OAuthFacebook}
          />
          <FcGoogle
            className="rounded-full p-1 ml-2 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all"
            onClick={OAuthGoogle}
          />
          <FaTwitter 
            className="rounded-full p-1 ml-2 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all" 
            onClick={OAuthTwitter}
          />
        </div>
      </div>
    </div>
  );
}
