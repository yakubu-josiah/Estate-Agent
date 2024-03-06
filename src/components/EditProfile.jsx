import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TbUpload } from 'react-icons/tb';
import { toast } from 'react-toastify';

export default function EditProfile () {
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();

    const [username, setUsername] = useState(user.displayName);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);


    useEffect(() => {
        setUsername(auth.currentUser.displayName || "");
        setImageUrl(auth.currentUser.photoURL || "");      
    }, [auth.currentUser])
    

    const updateForm = (e) => {
        setIsEditing(true); 
    };
    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Upload image (if selected)
            if (selectedImage) {
                const imageRef = ref(storage, `${user.displayName}/${user.uid}/profile_photo.jpg`);
                await uploadBytes(imageRef, selectedImage);
                const photoURL = await getDownloadURL(imageRef);
                setImageUrl(photoURL);
            }
            
            // Update if username changed
            if(username !== user.displayName && username !== ""){
                await updateProfile(auth.currentUser, {
                    displayName: username,
                    photoURL: imageUrl
                });
                toast.success('Profile updated successfully!');
            }

            // Success message
        } catch (error) {
            console.log('Error updating profile:', error);
            toast.error('An error occurred while updating your profile.');
        } finally {
            setSelectedImage(null);
            setIsEditing(false);
            setIsLoading(false);
        }
    };
  
    return (
        <form>
            <div className="imgCont h-[200px] w-full">
                <div className="">
                    <div className="image ml-9 mt-12 flex ">
                        { isLoading ? (
                            <div className="my-[20%] h-[10px] loading-container items-center align-middle flex justify-center">
                                <span className="spinner mt-0 text-white mr-3"></span>
                                <p className="letter-text font-bold">Saving....</p>
                            </div>
                        ): (
                            <>
                                <div id="img" className={`relative rounded-md row-auto max-h-[200px] w-[200px] mr-9 space-y-3 border-4 border-white shadow-lg bg-[#3a3a3a]`}>
                                    {imageUrl ? (
                                        <div className={`w-full h-full ${isEditing ? "opacity-50" : ""}`}>
                                            <img className="" src={imageUrl} alt="Profile_Photo" />
                                        </div>
                                    ) : (
                                        <div className={`no-photo w-full h-[196px] ${isEditing ? "opacity-50" : ""}`}>
                                            <img className="h-full w-full object-fill" src={process.env.PUBLIC_URL + "/images/no_photo.jpg"} alt="no_photo"/>
                                        </div>
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
                                                <TbUpload className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl cursor-pointer text-gray-50 hover:text-gray-700 z-20" />
                                                <input type="file" id="profile-image" className='hidden' onChange={handleImageChange} />
                                            </label>
                                            {selectedImage && <p className='text-sm text-start truncate mt-0'>Profile image: {selectedImage.name}</p>}
                                            <input
                                                className="border-2 border-green-500 text-green-500 hover:bg-green-600 hover:text-white font-bold py-1 w-full rounded transition duration-300 ease-in-out mt-1"
                                                type="submit"
                                                value="Save Changes"
                                                onClick={handleSubmit}
                                            />
                                        </>
                                    )}
                                </div>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}
