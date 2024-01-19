import React from 'react'
import { GrEdit } from "react-icons/gr";
import { BsFillTrash3Fill } from "react-icons/bs";


export default function ListingActions({onEdit, onDelete}) {
    

  return (
    <div className="flex justify-between items-center space-x-2 w-full"> {/* Full width, justify content, center items */}
        <button 
            className="w-1/2 flex items-center px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" 
            onClick={(e) => onEdit(e)
        }>
        <GrEdit className="w-6 h-6 mr-2" /> {/* Icon with spacing */}
        Edit
        </button>
        <button 
        className="w-1/2 flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        onClick={(e) => onDelete(e)
        }>
        <BsFillTrash3Fill className="w-6 h-6 mr-2" /> {/* Icon with spacing */}
        Delete
        </button>
    </div>
  )
}
