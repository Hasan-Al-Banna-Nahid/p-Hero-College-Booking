"use client";
import { useState, useEffect } from "react";

// ReviewCard Component to display each individual review
const ReviewCard = ({ review, collegeName }) => (
  <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-transform duration-500 ease-in-out transform hover:scale-105">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="font-semibold text-lg text-gray-800 mb-2">
        {collegeName}{" "}
      </h4>
      <div className="flex items-center mb-3">
        <p className="text-yellow-400 text-sm mr-2">Rating:</p>
        <div className="flex text-yellow-400">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={index < review.rating ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          ))}
        </div>
      </div>
      <p className="text-gray-600">{review.reviewText}</p>
    </div>
  </div>
);

// ReviewsSection Component to display all the reviews
const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch the reviews from localStorage and set them to state
    const storedReviews =
      JSON.parse(localStorage.getItem("collegeReviews")) || {};

    // Transform the stored reviews into an array of review objects with college name
    const reviewsArray = Object.entries(storedReviews).flatMap(
      ([collegeName, collegeReviews]) =>
        collegeReviews.map((review) => ({
          ...review,
          collegeName,
        }))
    );

    setReviews(reviewsArray); // Set the reviews array to state
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 tracking-wide">
        Student Reviews
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard
              key={index}
              review={review}
              collegeName={review.collegeName}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No reviews available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
