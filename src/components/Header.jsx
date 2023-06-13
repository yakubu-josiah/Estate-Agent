import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
    const location = useLocation();
    const nav = useNavigate();
    function checkRoute(route){
        if(route === location.pathname){
            return true;
        }
    }




    return (
    <div className='bg-white border-b shadow-md sticky top-0 z-50'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div className="header">
                <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Our Logo" className='cursor-pointer'
                    onClick={() => {nav('/')}}
                />
            </div>
            <div className="">
                <ul className='flex space-x-10'>
                    <li className={`py-3 text-sm fold-semibold text-gray-400 border-b-[3px] border-b-transparent 
                        ${checkRoute("/") && "header-active"}`}
                        onClick={() => {nav('/')}}>Home
                    </li>
                    <li className={`py-3 text-sm fold-semibold text-gray-400 border-b-[3px] border-b-transparent 
                        ${checkRoute("/offers") && "header-active"}`}
                        onClick={() => {nav('/offers')}}>Offers
                    </li>
                    <li className={`py-3 text-sm fold-semibold text-gray-400 border-b-[3px] border-b-transparent 
                        ${checkRoute("/sign-in") && "header-active"}`}
                        onClick={() => {nav('/sign-in')}}>Sign in
                    </li>
                </ul>
            </div>
        </header>
    </div>
  )
}
