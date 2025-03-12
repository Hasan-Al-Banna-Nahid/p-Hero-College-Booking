"use client";
import { useState, useEffect } from "react";

const MyCollege = () => {
  const [myColleges, setMyColleges] = useState([]);
  const [reviews, setReviews] = useState({}); // Store reviews by university name

  useEffect(() => {
    // Retrieve college applications from localStorage
    const storedData = JSON.parse(localStorage.getItem("myCollege")) || [];
    setMyColleges(storedData);

    // Retrieve existing reviews from localStorage, initialize as empty object if none
    const storedReviews =
      JSON.parse(localStorage.getItem("collegeReviews")) || {};
    setReviews(storedReviews);
  }, []);

  const handleReviewSubmit = (universityName, reviewText, rating) => {
    // Ensure each review is associated with the university
    const newReview = {
      reviewText,
      rating,
      date: new Date().toISOString(),
    };

    // Retrieve current reviews from localStorage
    const storedReviews =
      JSON.parse(localStorage.getItem("collegeReviews")) || {};

    // Check if there are already reviews for this university
    if (!storedReviews[universityName]) {
      storedReviews[universityName] = []; // Initialize an empty array for this university if none exists
    }

    // Append the new review to the existing reviews list for the university
    storedReviews[universityName].push(newReview);

    // Save the updated list of reviews back to localStorage
    localStorage.setItem("collegeReviews", JSON.stringify(storedReviews));

    // Update state with the new reviews
    setReviews(storedReviews);

    alert("Review submitted successfully!");
  };

  return (
    <div className="container mx-auto p-6 mt-8">
      <h2 className="text-3xl mt-12 font-extrabold text-center text-gray-800 mb-6">
        My College Applications
      </h2>

      {myColleges.length === 0 ? (
        <p className="text-center text-gray-500">
          No college applications found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myColleges.map((college, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
            >
              {college.image && (
                <img
                  src={college.image}
                  alt="College Profile"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}

              <p>
                <strong>Name:</strong> {college.name}
              </p>
              <p>
                <strong>Subject:</strong> {college.subject}
              </p>
              <p>
                <strong>Email:</strong> {college.email}
              </p>
              <p>
                <strong>Phone:</strong> {college.phone}
              </p>
              <p>
                <strong>Address:</strong> {college.address}
              </p>
              <p>
                <strong>Date of Birth:</strong> {college.dob}
              </p>
              <h3 className="text-xl font-semibold mt-4">
                <strong>College Name :</strong> {college.universityName}
              </h3>

              {/* Review Section */}
              <div className="mt-6">
                <h4 className="font-semibold">Add Review</h4>
                <textarea
                  id={`review-${college.universityName}`}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-2"
                  placeholder="Write your review..."
                ></textarea>
                <select
                  id={`rating-${college.universityName}`}
                  className="border-2 p-3 mt-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="5">⭐️⭐️⭐️⭐️⭐️ - Excellent</option>
                  <option value="4">⭐️⭐️⭐️⭐️ - Good</option>
                  <option value="3">⭐️⭐️⭐️ - Average</option>
                  <option value="2">⭐️⭐️ - Poor</option>
                  <option value="1">⭐️ - Bad</option>
                </select>
                <button
                  onClick={() => {
                    const reviewText = document.getElementById(
                      `review-${college.universityName}`
                    ).value;
                    const rating = document.getElementById(
                      `rating-${college.universityName}`
                    ).value;
                    if (reviewText.trim()) {
                      handleReviewSubmit(
                        college.universityName, // The university name as the key
                        reviewText,
                        rating
                      );
                      document.getElementById(
                        `review-${college.universityName}`
                      ).value = "";
                    } else {
                      alert("Please enter a review!");
                    }
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all mt-4 w-full"
                >
                  Submit Review
                </button>
              </div>

              {/* Display Reviews */}
              <div className="mt-6">
                <h4 className="font-semibold">Reviews</h4>
                {reviews[college.universityName] &&
                  reviews[college.universityName].map((rev, idx) => (
                    <div key={idx} className="bg-gray-100 p-4 rounded-lg mt-4">
                      <p className="italic">"{rev.reviewText}"</p>
                      <p className="text-sm text-gray-600">
                        Rating: {rev.rating} ⭐️
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(rev.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCollege;
