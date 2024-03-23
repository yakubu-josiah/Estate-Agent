import React from 'react';
import { ImLocation } from "react-icons/im";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";


export default function Footer() {
  return (
    <footer className="relative w-full h-full block bg-[#ece0ac] sm:flex justify-center text-[#646464] overflow-hidden">
        <div className="w-full h-full">
            <div className="px-6 md:px-10 py-10">
                <h2 className="footer-text text-md sm:text-2xl font-extrabold">ABOUT US</h2>
                <hr className="w-[95%] mb-3 bg-gray-500 h-[2px]"/>
                <p className="text-xs sm:text-md footer-text font-bold">Land Deals NG</p>
                <p className="text-xs sm:text-md footer-text font-bold sm:text-sm">Yakubu@LandDealsNGWebSolution.net</p>
                <p className="text-xs sm:text-md footer-text font-bold">Call Agent: 0807 7350 007 </p>

                <p className="text-sm sm:text-md footer-text mt-3 text-justify">At Land Deals NG, we're revolutionizing the way land deals are made. 
                    Our web application is designed to connect real estate agents and buyers seamlessly, 
                    making the process of browsing properties, finding your dream home, and making inquiries effortless.
                </p>

            </div>
        </div>
        <div className="w-full h-full">
            <div className="px-6 md:px-10 py-10">
                <h2 className="footer-text text-md sm:text-2xl font-extrabold">CONTACT US</h2>
                <hr className="w-[95%] mb-3 bg-gray-500 h-[2px]"/>
                <p className="text-xs sm:text-md footer-text flex items-center mb-2">
                    <ImLocation className="mr-3 text-xl"/>
                    Yaba Orile-Igamu Jakande
                </p>
                <p className="text-xs sm:text-md footer-text flex items-center mb-2">
                    <MdOutlinePhoneIphone className="mr-3 text-xl"/>
                    321-689-6976 / +1 098 765 432
                </p>
                <a href="mailto:josiahmailer@gmail.com" className="text-xs sm:text-md footer-text flex items-center underline text-blue-900">
                    <AiTwotoneMail className="mr-3 text-xl text-gray-500"/>
                    thisDeveloper@gmail.com
                </a>
            </div>
        </div>
    </footer>
  )
}
