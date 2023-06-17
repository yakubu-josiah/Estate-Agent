import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";


export default function OAuth() {
  return (
    <div className='flex justify-center text-4xl'>
        <FaFacebookF className='rounded-full bg-gray-200 p-1 cursor-pointer'/>
        <FcGoogle className='rounded-full bg-gray-200 p-1 ml-2 cursor-pointer'/>
        <FaTwitter className='rounded-full bg-gray-200 p-1 ml-2 cursor-pointer'/>
    </div>
  )
}
