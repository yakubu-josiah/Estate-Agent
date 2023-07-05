import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const nav = useNavigate();
  async function OAuthGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      let account = await signInWithPopup(auth, provider);
      let user = account.user;
      const dataRef = await getDoc(doc(db, "users", user.uid));
      if (!dataRef.exists()) {
        await setDoc(dataRef, {
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photo: user.photoURL,
          timestamp: Timestamp.fromDate(new Date()),
        });
        nav("/");
      }
    } catch (error) {
      console.log(error);
      console.log("Couldn't authorize with Google");
    }
  }
  return (
    <div className="flex justify-center text-4xl">
      <FaFacebookF className="rounded-full p-1 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all" />
      <FcGoogle
        className="rounded-full p-1 ml-2 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all"
        onClick={OAuthGoogle}
      />
      <FaTwitter className="rounded-full p-1 ml-2 cursor-pointer bg-orange-100 hover:bg-orange-200 transition-all" />
    </div>
  );
}
