import React, { useState } from "react";

export default function NewListings() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 5) {
      alert("You can only upload up to five images.");
      return;
    }
    setSelectedFiles(Array.from(files));
  };

  return (
    <div className="newList flex justify-center relative">
      <img
        src={process.env.PUBLIC_URL + "/images/listing.jpeg"}
        alt=""
        className="inset-0 object-cover top-[70px] bg-fixed fixed h-full w-full z-0"
      />

      <div className="form flex justify-center mx-auto z-10 pb-20">
        <div className="w-[80%] place-items-center">
          <h3 className="text-center my-10 sm:text-5xl text-3xl text-gray-300">
            CREATE A LISTING
          </h3>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:mx-auto items-start">
              {/* Property Information */}
              <div className="listForm">
                <div className="col">
                  <span className="label">Property Name</span>
                  <input type="text" placeholder="Enter name" />
                </div>

                <div className="col">
                  <span className="label">Property Type</span>
                  <input
                    type="text"
                    placeholder="e.g residential, commercial..."
                  />
                </div>

                <div className="col">
                  <span className="label">Property Category</span>
                  <input type="text" placeholder="e.g farm, vacant lot..." />
                </div>

                <div className="flex justify-center mt-5">
                  <div className="radio-container">
                    <input type="radio" name="radio-option" id="one" checked />
                    <input type="radio" name="radio-option" id="two" />
                    <label htmlFor="one" className="radio-button one w-full">
                      <span className="radio-icon"></span>
                      Sale
                    </label>
                    <label htmlFor="two" className="radio-button two w-full">
                      <span className="radio-icon"></span>
                      Rent
                    </label>
                  </div>
                </div>
                <div className="col">
                  <span className="inline-block">Property Description</span>
                  <textarea
                    className="block"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
              </div>

              {/* Land Details */}
              <div className="listForm">
                <div className="col">
                  <span className="label">Land Size</span>
                  <input type="text" placeholder="e.g 100010" />
                </div>

                <div className="col">
                  <span className="label">Dimensions</span>
                  <input type="text" placeholder="e.g 100010" />
                </div>

                <div className="col">
                  <span className="label">Topography</span>
                  <input type="text" placeholder="e.g flat, sloped...." />
                </div>

                <div className="col">
                  <span className="label">Soil Type</span>
                  <input type="text" placeholder="e.g 100010" />
                </div>

                <div className="col">
                  <span className="inline-block">Zonning</span>
                  <textarea
                    className="block"
                    placeholder="Enter regulations"
                  ></textarea>
                </div>
              </div>

              {/* Location Information */}
              <div className="listForm">
                <div className="col">
                  <span className="label">Address</span>
                  <input type="text" placeholder="Enter address" />
                </div>

                <div className="col">
                  <span className="label">City</span>
                  <input type="text" placeholder="Enter city" />
                </div>

                <div className="col">
                  <span className="label">State/Province</span>
                  <input type="text" placeholder="Enter state" />
                </div>

                <div className="col">
                  <span className="label">Zip/Postal Code</span>
                  <input type="text" placeholder="e.g 100010" />
                </div>

                <div className="col">
                  <span className="label">GPS Coordinates</span>
                  <input type="text" placeholder="e.g 100010" />
                </div>

                <div className="col">
                  <span className="label">Upload Images</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
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
                  <span className="label">Sale Price</span>
                  <input type="text" placeholder="e.g 100010" />
                </div>

                <div className="col">
                  <span className="label">Lease Price</span>
                  <input type="text" placeholder="e.g 100010" />
                </div>

                <div className="col">
                  <span className="label">Currency</span>
                  <input type="text" placeholder="e.g flat, sloped...." />
                </div>

                <div className="col">
                  <span className="inline-block">Amenities</span>
                  <textarea
                    className="block"
                    placeholder="List amenities"
                  ></textarea>
                </div>

                <div className="col">
                  <span className="label">Upload Video</span>
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    className="w-full"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-20">
              <input type="submit" value="Create" className="my-10" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
