import React, { useState, useContext } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { MyContext } from '../../src/MyContext'; // Assuming you're using context management
import { TbUpload } from 'react-icons/tb';

export default function EditProfile () {
    const auth = getAuth();
    const user = auth.currentUser;
    const { userDocRef, storageRef } = useContext(MyContext); // Access context variables

    const [selectedImage, setSelectedImage] = useState(null);
    const [username, setUsername] = useState(user.displayName);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);;
    const [error, setError] = useState(null);

    const updateForm = (e) => {
        setIsEditing(true); 
    };
    
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Upload image (if selected)
            if (selectedImage && storageRef) {
                const imageRef = ref(storageRef, `users/${user.uid}/profile_photo.jpg`);
                await uploadBytes(imageRef, selectedImage);
                const photoURL = await getDownloadURL(imageRef);
                await updateDoc(doc(userDocRef, user.uid), { photoURL });
                
                console.log("imageRef: " + photoURL);
            }
            
            // Update username (if changed)
                if (username !== user.displayName) {
                await updateProfile(user, { displayName: username });
                await updateDoc(doc(userDocRef, user.uid), { displayName: username });
            }

            // Success message
            console.log('Profile updated successfully!');
        } catch (error) {
            console.log('Error updating profile:', error);
            setError('An error occurred while updating your profile.');
        } finally {
            // console.log(selectedImage);
            console.log("UserDocRef" + userDocRef); 
            console.log("Storage: " + storageRef);
            setIsEditing(false);
            setIsLoading(false);
        }
    };
  
    return (
        <form>
            <div className="imgCont h-[200px] w-full">
                <div className="">
                    <div className="image ml-9 mt-12 flex ">
                        {!storageRef && isLoading ? (
                            <div className="loading-container items-center flex justify-center">
                                <span className="spinner text-white"></span>
                                <p className="letter-text font-bold top-10">Loading....</p>
                            </div>
                        ): (
                            <div id="img" className="relative rounded-md row-auto h-[200px] w-[200px] mr-9 space-y-3 border-4 border-white shadow-lg">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Profile_Photo" />
                                ) : (
                                    <div className="bg-red-300 w-full h-full z-10"></div>
                                )}

                                {!isEditing ? (
                                    <button
                                        className="border-2 border-gray-500 text-gray-500 hover:bg-gray-600 hover:text-white font-bold py-1 w-full rounded transition duration-300 ease-in-out"
                                        onClick={updateForm}
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <>
                                        <label htmlFor="profile-image">
                                            <TbUpload className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-4xl cursor-pointer text-gray-500 hover:text-gray-700 z-20" />
                                            <input type="file" id="profile-image" className='hidden' onChange={handleImageChange} />
                                        </label>
                                        {selectedImage && <p className='text-sm text-start truncate mt-0'>Selected image: {selectedImage.name}</p>}
                                        <input
                                            className="border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white font-bold py-1 w-full rounded transition duration-300 ease-in-out mt-1"
                                            type="submit"
                                            value="Save Changes"
                                            onClick={handleSubmit}
                                        />
                                    </>
                                )}
                            </div>
                        )}
                        <div className="text-gray-300 rounded-md flex flex-col items-center justify-center pt-3">
                            {!isEditing ? (
                                <h5 className="text-4xl mb-0">{username}</h5>
                                ) : (
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    placeholder="New username"
                                    className="text-[17px] sm:text-[22px] text-center p-1 max-w-[210px] text-gray-600 rounded-full"
                                />
                            )}
                            <p>{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
