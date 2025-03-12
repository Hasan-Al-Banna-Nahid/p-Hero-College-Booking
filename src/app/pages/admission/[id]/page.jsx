"use client";
import add from "../../../../../public/images/add.jpg";
import Image from "next/image";

const Admission = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Store the data in localStorage
    const storedData =
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("myCollege"))) ||
      [];
    storedData.push(data);
    typeof window !== "undefined" &&
      localStorage.setItem("myCollege", JSON.stringify(storedData));

    alert("Admission data saved successfully!");
  };

  return (
    <div className="container mt-12 mx-auto p-8 max-w-4xl flex flex-col lg:flex-row items-center justify-center space-x-8 space-y-8 lg:space-y-0">
      {/* Left side form with light gradient background */}
      <div className="w-full lg:w-1/2 bg-gradient-to-r from-teal-300 to-slate-200 border-2 border-gray-300 rounded-lg shadow-lg p-8 space-y-6 transform transition duration-300 hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Admission Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Candidate Name"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              required
            />
          </div>
          {/* Candidate Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Candidate Email"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              required
            />
          </div>
          {/* Candidate Phone */}
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Candidate Phone Number"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              required
            />
          </div>
          {/* Candidate Address */}
          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              required
            />
          </div>
          {/* Date of Birth */}
          <div>
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              required
            />
          </div>
          {/* Image Upload */}
          <div>
            <input
              type="file"
              name="image"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              required
            />
          </div>
          {/* Subject Interested */}
          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject Interested"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
          </div>
          {/* Current Profession */}
          <div>
            <input
              type="text"
              name="profession"
              placeholder="Current Profession"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
          </div>
          {/* University Name */}
          <div>
            <input
              type="text"
              name="universityName"
              placeholder="University Name"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Right side image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
          src={add}
          alt="Admission"
          className="max-w-full rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Admission;
