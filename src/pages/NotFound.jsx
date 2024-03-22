import React from 'react'
import { IoReturnDownForwardOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const nav = useNavigate();
    
    const homepage = () => {
        nav("/");
    }

    return (
        <div className="newList flex justify-center relative h-full overflow-hidden">
            <img src={process.env.PUBLIC_URL + "/images/404.jpeg"} 
                alt="Page Not Found" 
                className="inset-0 object-fill bg-fixed fixed h-full w-full -z-10"
            />

            <div className="bg-[#23252ba9] flex justify-center w-full h-full fixed overflow-hidden z-10">
                <div className="mx-auto my-[40%] sm:my-[20%] lg:my-[10%] h-fit text-center">
                    <h1 className=" text-white text-[7rem] sm:text-[10rem] p-0 mb-0 font-extrabold">404</h1>
                    <p className="mx-auto text-center sm:text-lg leading-none text-white max-w-[70%] md:max-w-[50%]">Oops! Looks like this land is exploring uncharted territories. It seems we've lost our way. Let's head back to familiar grounds.</p>
                    <button onClick={homepage} className="mx-auto mt-5 text-center flex items-center px-6 py-2 bg-gray-900 hover:bg-gray-400 rounded-full text-white hover:text-gray-900 transition-all ease-in-out duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Back to Home 
                        <IoReturnDownForwardOutline className="w-6 h-6 ml-3" />
                    </button>
                </div>
            </div>
        </div>
    )
}
