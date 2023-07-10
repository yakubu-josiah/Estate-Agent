import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const nav = useNavigate();
  const auth = getAuth();
  const OAuthFacebook = async () => {
    let provider = new FacebookAuthProvider();
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
          timestamp: Timestamp.fromDate(new Date()),
          photo: user.photoURL,
        });
        console.log(user);
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const OAuthGoogle = async () => {
    let provider = new GoogleAuthProvider();
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
        console.log(user);
        nav("/");
      }
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        // User closed the authentication popup
        console.log("Authentication popup closed by the user");
      } else {
        // Other error occurred, handle it accordingly
        console.log("Error during authentication:", error);
      }
    }
  };
  return (
    <div className="flex justify-center text-4xl">
      <FaFacebookF
        className="rounded-full p-1 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all"
        onClick={OAuthFacebook}
      />
      <FcGoogle
        className="rounded-full p-1 ml-2 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all"
        onClick={OAuthGoogle}
      />
      <FaTwitter className="rounded-full p-1 ml-2 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all" />
    </div>
  );
}
