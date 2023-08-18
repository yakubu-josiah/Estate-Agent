import React from "react";

export default function NewListings() {
  return (
    <div className="newList flex justify-center">
      <img
        src={process.env.PUBLIC_URL + "/images/listing.jpeg"}
        alt=""
        className="form object-cover w-full h-full"
      />
      <div className="form flex justify-center">
        <form className="listForm my-auto" method="post">
          <h3 className="text-center my-10 sm:text-5xl text-3xl text-gray-300">
            CREATE A LISTING
          </h3>
          <div className="col">
            <span className="label">Name</span>
            <input type="text" placeholder="Enter your name" />
          </div>

          <div className="flex justify-end">
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
            <span className="inline-block">Message</span>
            <textarea
              className="block"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <input type="submit" value="Create" />
          </div>
        </form>
      </div>
    </div>
  );
}
