import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { IoCloseCircleOutline } from 'react-icons/io5';
import { db } from '../../firebaseConfig';
import { toast } from 'react-toastify';

export default function Contact({ closeBTN, listing, userRef }) {
    const [message, setMessage] = useState('');
    const [agentData, setAgentData] = useState(null);

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    useEffect(() => {
        async function fetchAgentData() {
            const docRef = doc(db, "users", userRef);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setAgentData(docSnap.data())
            } else {
                toast.error("Opps! Error fetching Agent's contact.");
            }
        }
        fetchAgentData();
    }, [userRef])

    return (
        <div>
            {agentData !== null && (
                <>
                    <button className="absolute top-0 right-0 block" onClick={closeBTN}>
                        <IoCloseCircleOutline className="text-red-600 text-3xl" />
                    </button>
                    <p className="block text-gray-500 mt-0">You're about sending a mail to <span className="text-purple-600 font-bold">{agentData.username.charAt(0).toUpperCase() + agentData.username.slice(1)}</span> agent concerning this listing.</p>
                    <textarea
                        className="w-full ring-offset-inherit bg-[#ffeeb1] border-green-500 focus:border-purple-400 text-gray-600"
                        name="message" id="" rows="3"
                        onChange={onChange}
                        value={message}
                    ></textarea>
                    <a
                        href={`mailto:${agentData.email}?Subject=${listing?.name}&body=${message}`}
                        className="block border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white active:bg-green-600 active:text-white font-bold py-2 px-5 w-full rounded transition text-center ease-in-out duration-300 uppercase"
                    >
                        Send Message
                    </a>
                </>
            )}
        </div>
    )
}
