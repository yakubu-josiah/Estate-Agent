import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

export default function EditListing() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    description: "",
    size: "",
    dimension: "",
    topography: "",
    soilType: "",
    zonning: "",
    address: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    sale: "",
    lease: "",
    landmark: "",
    amenities: "",
    images: "",
  });
  const {
    name,
    type,
    category,
    description,
    size,
    dimension,
    topography,
    soilType,
    zonning,
    address,
    city,
    state,
    latitude,
    longitude,
    sale,
    lease,
    landmark,
    amenities,
    images,
  } = formData;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("sale");
  const [listing, setListing] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const auth = getAuth();
  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      alert("You can only upload up to five images."); //error will come in here later..
      return;
    }
    setSelectedFiles(Array.from(files));
  };

  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const dataForm = await getDoc(docRef);
      if (dataForm.exists()) {
        setListing(dataForm.data());
        setFormData({ ...dataForm.data() });
        setIsLoading(false);
      } else {
        nav("/profile");
        toast.error("Error! Listing does not exists.");
      }
    }
    fetchListing();
  }, [nav, params.listingId]);

  async function editListing(e) {
    e.preventDefault();
    setIsUpdating(true);
    let geolocation = {
      lat: 37.7749, // Replace with desired latitude
      lng: -122.4194,
    };
    try {
      // if (geoPoint) {
      //   const response = await fetch(
      //     `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      //   );
      //   const data = await response.json();

      //   if (data.status === "OK") {
      //     geolocation.lat = data.results[0].geometry.location.lat;
      //     geolocation.lng = data.results[0].geometry.location.lng;
      //   } else {
      //     setIsLoading(false);
      //     // Handle the case when geocoding fails
      //     // Display an error message to the user.
      //     // setError("Geocoding failed. Please enter a valid address.");
      //     return;
      //   }
      //}
      //  else {
      //   geolocation.lat = latitude;
      //   geolocation.lng = longitude;
      // }

      if (selectedFiles.length > 0) {
        await uploadImages(selectedFiles, geolocation);
      }
    } catch (error) {
      setIsUpdating(false);
      return;
    }
  }

  // Image Upload Functions
  async function uploadImages(files, geolocation) {
    try {
      const storage = getStorage();
      const imageUrls = [];

      for (const file of files) {
        const filename = `${auth.currentUser.uid}-${file.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                imageUrls.push(downloadURL);
                resolve();
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      }

      console.log("Image URLs:", imageUrls);

      const formDataCopy = {
        ...formData,
        images: imageUrls,
        geolocation,
        timestamp: serverTimestamp(),
        userRef: auth.currentUser.uid,
      };
      const docRef = await updateDoc(
        doc(db, "listings", params.listingId),
        formDataCopy
      );
      console.log("Document added:", docRef);
      setIsLoading(false);
      toast.success("Listing updated successfully!");
      nav("/profile");
      // navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating listing:", error);
      throw error;
      // Handle the image upload error by displaying a message to the user later.
      // setError("Image upload failed. Please try again later.");
    }
  }

  return (
    <div className="newList flex justify-center relative">
      <img
        src={process.env.PUBLIC_URL + "/images/listing.jpeg"}
        alt=""
        className="inset-0 object-cover top-[70px] bg-fixed fixed h-full w-full z-0"
      />

      <div className="form flex justify-center mx-auto z-10 pb-20">
        <div className="w-[80%] place-items-center">
          <h3 className="text-center my-10 sm:text-5xl text-2xl text-gray-300">
            YOU ARE ABOUT EDITING THIS LISTING
          </h3>
          {isLoading ? (
            <div className="loading-container items-center flex justify-center space-x-5 h-[80vh]">
              <span className="spinner text-white"></span>
              <p className="letter-text font-bold top-10">Loading....</p>
              {/* <span class="letter-text">L</span>
              <span class="letter-text">o</span>
              <span class="letter-text">a</span>
              <span class="letter-text">d</span>
              <span class="letter-text">i</span>
              <span class="letter-text">n</span>
              <span class="letter-text">g</span> */}
            </div>
          ) : (
            <form onSubmit={editListing}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:mx-auto items-start">
                {/* Property Information */}
                <div className="listForm">
                  <div className="col">
                    <span className="label">Property Name</span>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={handleChange}
                      placeholder="Enter name"
                    />
                  </div>

                  <div className="col">
                    <span className="label">Property Type</span>
                    <input
                      type="text"
                      placeholder="e.g residential, commercial..."
                      name="type"
                      id="type"
                      value={type}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <span className="label">Property Category</span>
                    <input
                      type="text"
                      placeholder="e.g farm, vacant lot..."
                      name="category"
                      id="category"
                      value={category}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex justify-center mt-5">
                    <div className="radio-container">
                      <input
                        type="radio"
                        name="radio-option"
                        id="sale"
                        checked={selectedOption === "sale"}
                        value="sale"
                        onChange={handleOptionChange}
                      />
                      <input
                        type="radio"
                        name="radio-option"
                        id="lease"
                        value="lease"
                        checked={selectedOption === "lease"}
                        onChange={handleOptionChange}
                      />
                      <label htmlFor="sale" className="radio-button one w-full">
                        <span className="radio-icon"></span>
                        Sale
                      </label>
                      <label
                        htmlFor="lease"
                        className="radio-button two w-full"
                      >
                        <span className="radio-icon"></span>
                        Lease
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <span className="inline-block">Property Description</span>
                    <textarea
                      className="block"
                      name="description"
                      id="description"
                      value={description}
                      onChange={handleChange}
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                </div>

                {/* Land Details */}
                <div className="listForm">
                  <div className="col">
                    <span className="label inline-block">
                      Land Size
                      <span className="lowercase text-yellow-200">
                        (in meters)
                      </span>
                    </span>
                    <input
                      type="text"
                      placeholder="e.g 100010"
                      name="size"
                      id="size"
                      value={size}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <span className="label">
                      Dimensions
                      <span className="lowercase text-yellow-200">
                        (length, width)
                      </span>
                    </span>
                    <input
                      type="text"
                      placeholder="e.g 100010"
                      name="dimension"
                      id="dimension"
                      value={dimension}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <span className="label">Topography</span>
                    <input
                      type="text"
                      placeholder="e.g flat, sloped...."
                      name="topography"
                      id="topography"
                      value={topography}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <span className="label">Soil Type</span>
                    <input
                      type="text"
                      placeholder=""
                      name="soilType"
                      id="soilType"
                      value={soilType}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <span className="inline-block">Zonning</span>
                    <textarea
                      name="zonning"
                      id="zonning"
                      value={zonning}
                      className="block"
                      onChange={handleChange}
                      placeholder="Enter regulations"
                    ></textarea>
                  </div>
                </div>

                {/* Location Information */}
                <div className="listForm">
                  <div className="col">
                    <span className="label">Address</span>
                    <input
                      type="text"
                      placeholder="Enter address"
                      name="address"
                      id="address"
                      value={address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <span className="label">City</span>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="col">
                    <span className="label">State/Province</span>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={state}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />
                  </div>

                  <div className="col mt-2 w-full">
                    <span className="label"> GPS Coordinates</span>
                    <input
                      type="number"
                      name="latitude"
                      id="latitude"
                      value={latitude}
                      min="-90"
                      max="90"
                      onChange={handleChange}
                      placeholder="Latitude"
                    />
                  </div>

                  <div className="col mt-1 mb-2">
                    <input
                      type="number"
                      name="longitude"
                      id="longitude"
                      value={longitude}
                      min="-180"
                      max="180"
                      onChange={handleChange}
                      placeholder="Longitude"
                    />
                  </div>

                  <div className="col">
                    <span className="label">
                      Upload Images
                      <span className="lowercase text-yellow-200">
                        (max. 5)
                      </span>
                    </span>
                    <input
                      type="file"
                      name="images"
                      multiple
                      // required
                      accept=".jpg,.png,.jpeg"
                      className="w-full"
                      onChange={handleFileChange}
                    />
                    <div>
                      <span>Images Selected:</span>
                      <ul>
                        {selectedFiles.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Price and Utilities */}
                <div className="listForm">
                  <div className="col">
                    <span className="label">Sale Price(₦)</span>
                    <input
                      type="text"
                      name="sale"
                      id="sale"
                      value={sale}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <span className="label">Lease Price(₦)</span>
                    <input
                      type="text"
                      name="lease"
                      id="lease"
                      value={lease}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <span className="label">Close Landmark</span>
                    <input
                      type="text"
                      name="landmark"
                      id="landmark"
                      value={landmark}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <span className="inline-block">Amenities</span>
                    <textarea
                      className="block"
                      placeholder="List amenities"
                      name="amenities"
                      id="amenities"
                      value={amenities}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col">
                    <span className="label">Upload Video</span>
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      className="w-full"
                      // onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-20">
                {isUpdating ? (
                  <div className="flex justify-center items-center relative w-full">
                    <input
                      type="submit"
                      value="Saving..."
                      className="sm:text-[15px] my-10 cursor-not-allowed opacity-40"
                    />
                    <span className="spinner cursor-not-allowed absolute left-[63%] sm:left-[55%]"></span>
                  </div>
                ) : (
                  <input
                    type="submit"
                    value="Update"
                    className="my-10 cursor-pointer"
                  />
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
