import { useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useFormValidation } from "../../hooks/useFormValidations";

const validationRules = {
  name: {
    rule: (value) => !!value && value.length > 6, 
    message: "Name must be greater than 6 characters",
  },
  description: {
    rule: (value) => !!value && value.length > 10, 
    message: "Please give full description",
  },
  size: {
    rule: (value) => value.length > 1, 
    message: "Please give a valid land size",
  },
  dimension: {
    rule: (value) => /^\d+,?\d+$/.test(value.trim()), 
    message: "Invalid dimension format e.g(length,width)",
  },
  address: {
    rule: (value) => !!value && value.length > 5, 
    message: "Please give full address",
  },
  landmark: {
    rule: (value) => !!value.trim() && value.trim().length >= 6, 
    message: "Close landmark is required and should be well known",
  },
};



export default function NewListings() {
  const auth = getAuth();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    description: "",
    size: "",
    dimension: "",
    topography: "",
    soilType: "",
    zoning: "",
    address: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    sale: "",
    lease: "",
    landmark: "",
    amenities: "",
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
    zoning,
    address,
    city,
    state,
    latitude,
    longitude,
    sale,
    lease,
    landmark,
    amenities,
  } = formData;

  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("sale");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const { errors, isValid } = useFormValidation(formData, validationRules);

  // Event Handlers
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    setIsCompleted(false);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      toast.error("You can only upload up to five images.");
      return;
    }
    setSelectedFiles(Array.from(files));
  };

  // FORM SUBMITTING FUNCTION

  async function submitListing(e) {
    e.preventDefault();
    if (!isValid){
      setIsCompleted(true);
      return;
    };

    let geolocation = {
      lat: parseFloat(latitude), 
      lng: parseFloat(longitude),
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
      if (!selectedFiles.length) {
        setIsLoading(true);
        await uploadImages(selectedFiles, geolocation);
      }
      return;
    } catch (error) {
      setIsLoading(false);
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

      const formDataCopy = {
        ...formData,
        images: imageUrls,
        geolocation,
        timestamp: serverTimestamp(),
        userRef: auth.currentUser.uid,
      };
      
      console.log("got here");
      const docRef = await addDoc(collection(db, "listings"), formDataCopy);
      console.log("Document added:", docRef);
      setIsLoading(false);
      toast.success("Listing has been created successfully!");
      nav("/profile");
      // nav(`/category/${formDataCopy.type}/${docRef.id}`);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error creating listing:", error);
      throw error;
      // Handle the image upload error by displaying a message to the user later.
      // setError("Image upload failed. Please try again later.");
    }
  }

  // Component Rendering
  return (
    <div className="newList flex justify-center relative">
      <img
        src={process.env.PUBLIC_URL + "/images/listing.jpeg"}
        alt=""
        className="inset-0 object-cover bg-fixed fixed h-full w-full -z-10"
      />

      <div className="form flex justify-center mx-auto z-10 pb-20 h-full">
        <div className="w-[80%] place-items-center">
          <h3 className="text-center my-10 sm:text-5xl text-3xl font-bold shadow-xl py-2 text-gray-300">
            CREATE A LISTING
          </h3>
          <form onSubmit={submitListing}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:mx-auto items-start">
              {/* Property Information */}
              <div className="listForm">
                <div className="col mb-3">
                  <span className="label">*Property Name</span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className={`sm:text-[12px] p-2 pl-12 w-full${errors.name && formData.name !== "" ? "border-red-400 text-red-400": "" }`}
                  />
                  {errors.name && formData.name !== "" && (
                    <p className="text-white text-sm mt-1 text-center bg-red-400 pl-1">{errors.name}</p>
                  )}
                </div>

                <div className="col mb-3">
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

                <div className="col mb-3">
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

                <div className="flex justify-center mt-10 mb-2">
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
                    <label htmlFor="lease" className="radio-button two w-full">
                      <span className="radio-icon"></span>
                      Lease
                    </label>
                  </div>
                </div>
                <div className="col mb-3">
                  <span className="inline-block">*Property Description</span>
                  <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    className={`sm:text-[12px] p-2 pl-12 w-full${errors.description && formData.description !== "" ? "border-red-400 text-red-400": ""}`}
                  ></textarea>
                {errors.description && formData.description !== "" && (
                  <p className="text-white text-sm text-center pl-1 bg-red-400">{errors.description}</p>
                )}
                </div>
              </div>

              {/* Land Details */}
              <div className="listForm">
                <div className="col mb-3">
                  <span className="label inline-block">*Land Size<span className="lowercase text-yellow-200">
                      (in meters)
                    </span>
                  </span>
                  <input
                    type="number"
                    placeholder="e.g 100010"
                    name="size"
                    id="size"
                    value={size}
                    onChange={handleChange}
                    className={`sm:text-[12px] p-2 pl-12 w-full${errors.size && formData.size !== "" ? "border-red-400 text-red-400": ""}`}
                  />
                  {errors.size && formData.size !== "" && (
                    <p className="text-white text-sm text-center pl-1 mt-1 bg-red-400">{errors.size}</p>
                  )}
                </div>

                <div className="col mb-3">
                  <span className="label">*Dimensions<span className="lowercase text-yellow-200">
                      (length, width)
                    </span>
                  </span>
                  <input
                    type="text"
                    placeholder="e.g 123, 456"
                    name="dimension"
                    id="dimension"
                    value={dimension}
                    onChange={handleChange}
                    className={`sm:text-[12px] p-2 pl-12 w-full${errors.dimension && formData.dimension !== "" ? "border-red-400 text-red-400": ""}`}
                  />
                  {errors.dimension && formData.dimension !== "" && (
                    <p className="text-white text-sm text-center pl-1 mt-1 bg-red-400">{errors.dimension}</p>
                  )}
                </div>

                <div className="col mb-3">
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

                <div className="col mb-3">
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

                <div className="col mb-3">
                  <span className="inline-block">Zoning</span>
                  <textarea
                    name="zoning"
                    id="zoning"
                    value={zoning}
                    className="block"
                    onChange={handleChange}
                    placeholder="Enter regulations"
                  ></textarea>
                </div>
              </div>

              {/* Location Information */}
              <div className="listForm">
                <div className="col mb-3">
                  <span className="label">*Address</span>
                  <input
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    id="address"
                    value={address}
                    onChange={handleChange}
                    className={`sm:text-[12px] p-2 pl-12 w-full${errors.address && formData.address !== "" ? "border-red-400 text-red-400": ""}`}
                  />
                  {errors.address && formData.address !== "" && (
                    <p className="text-white text-sm text-center pl-1 mt-1 bg-red-400">{errors.address}</p>
                  )}
                </div>

                <div className="col mb-3">
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

                <div className="col mb-3">
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
                  <span className="label">*GPS Coordinates</span>
                  <input
                    type="number"
                    name="latitude"
                    id="latitude"
                    value={latitude}
                    // min="-90"
                    // max="90"
                    onChange={handleChange}
                    placeholder="Latitude"
                    className={`sm:text-[12px] p-2 pl-12 w-full${errors.latitude && formData.latitude !== "" ? "border-red-400 text-red-400": ""}`}
                  />
                </div>

                <div className="col mt-1 mb-3">
                  <input
                    type="number"
                    name="longitude"
                    id="longitude"
                    value={longitude}
                    // min="-180"
                    // max="180"
                    onChange={handleChange}
                    placeholder="Longitude"
                    className={`sm:text-[12px] p-2 pl-12 w-full${errors.longitude && formData.longitude !== "" ? "border-red-400 text-red-400": ""}`}
                    />
                </div>
                {errors.latitude && formData.latitude !== "" && (
                  <p className="text-white text-sm text-center pl-1 mt-1 bg-red-400">{errors.latitude}</p>
                )}
                {errors.longitude && formData.longitude !== "" && (
                  <p className="text-white text-sm text-center pl-1 mt-1 bg-red-400">{errors.longitude}</p>
                )}

                <div className="col mb-3">
                  <span className="label">
                    Upload Images
                    <span className="lowercase text-yellow-200">(max. 5)</span>
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
                <div className="col mb-3">
                  <span className="label">*Sale Price(₦)</span>
                  <input
                    type="text"
                    name="sale"
                    id="sale"
                    value={sale}
                    onChange={handleChange}
                    className={`sm:text-[12px] p-2 pl-12 w-full${errors.sale && formData.sale !== "" ? "border-red-400 text-red-400": "" }`}
                  />
                  {errors.sale && formData.sale !== "" && (
                    <p className="text-white text-sm mt-1 text-center bg-red-400 pl-1">{errors.sale}</p>
                  )}
                </div>

                <div className="col mb-3">
                  <span className="label">*Lease Price(₦)</span>
                  <input
                    type="text"
                    name="lease"
                    id="lease"
                    value={lease}
                    onChange={handleChange}
                    className={`sm:text-[12px] p-2 pl-12 w-full${errors.lease && formData.lease !== "" ? "border-red-400 text-red-400": "" }`}
                  />
                  {errors.lease && formData.lease !== "" && (
                    <p className="text-white text-sm mt-1 text-center bg-red-400 pl-1">{errors.lease}</p>
                  )}
                </div>

                <div className="col mb-3">
                  <span className="label">*Close Landmark</span>
                  <input
                    type="text"
                    name="landmark"
                    id="landmark"
                    value={landmark}
                    onChange={handleChange}
                    className={`sm:text-[12px] p-2 pl-12 w-full${errors.landmark && formData.landmark !== "" ? "border-red-400 text-red-400": "" }`}
                  />
                  {errors.landmark && formData.landmark !== "" && (
                    <p className="text-white text-sm mt-1 text-center bg-red-400 pl-1">{errors.landmark}</p>
                  )}
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

            <div className="flex justify-center mt-20 text-center">
              {isLoading ? (
                <div className="flex justify-center items-center relative w-full">
                  <input
                    type="submit"
                    value="Saving"
                    className="sm:text-[15px] my-10 cursor-not-allowed opacity-40"
                  />
                  <span className="spinner cursor-not-allowed absolute left-[63%] sm:left-[55%]"></span>
                </div>
              ) : (
                <div className="w-full text-center">
                  <input type="submit" value="Create" className="mt-10 mb-3 cursor-pointer" />
                  {isCompleted && (
                    <p className="text-gray-200 text-sm mt-2 px-2 w-[270px] mx-auto rounded bg-red-400 text-center">*Please complete all fields with asterisk</p>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
