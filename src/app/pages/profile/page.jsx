"use client";

import { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdSave } from "react-icons/md";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [collegeData, setCollegeData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    address: "",
  });

  // Load user and college data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const storedCollege = JSON.parse(localStorage.getItem("myCollege")) || [];

    setUser(storedUser);
    setCollegeData(storedCollege);

    setFormData({
      name: storedUser.name || "",
      email: storedUser.email || "",
      university:
        storedUser.university || storedCollege[0]?.universityName || "",
      address: storedUser.address || "",
    });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated data to localStorage
  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="mt-8 min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Profile
        </h2>

        {/* Profile Details */}
        <div className="flex flex-col items-center mb-6">
          <FaUserEdit className="text-gray-500 text-6xl mb-4" />
          <h3 className="text-xl font-semibold">{formData.name}</h3>
          <p className="text-gray-500">{formData.email}</p>
        </div>

        {/* Edit Mode Form */}
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Email"
            />
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="University"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Address"
            />

            <button
              onClick={handleSave}
              className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center hover:bg-green-600 transition"
            >
              <MdSave className="mr-2" />
              Save Changes
            </button>
          </div>
        ) : (
          // View Mode
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong>Name:</strong> {formData.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="text-gray-700">
              <strong>University:</strong> {formData.university}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {formData.address}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition"
            >
              <FaUserEdit className="mr-2" />
              Edit Profile
            </button>
          </div>
        )}

        {/* Display Multiple College Records */}
        {collegeData.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              College Enrollments
            </h3>
            {collegeData.map((college, index) => (
              <div
                key={index}
                className="border-l-4 border-indigo-500 bg-gray-100 p-4 mb-4 rounded-lg shadow-md"
              >
                <p className="text-gray-700">
                  <strong>University:</strong> {college.universityName}
                </p>
                <p className="text-gray-700">
                  <strong>Subject:</strong> {college.subject}
                </p>
                <p className="text-gray-700">
                  <strong>Profession:</strong> {college.profession}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {college.phone}
                </p>
                <p className="text-gray-700">
                  <strong>Date of Birth:</strong> {college.dob}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {college.address}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
