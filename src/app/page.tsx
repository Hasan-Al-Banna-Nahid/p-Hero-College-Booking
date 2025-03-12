"use client";

import Navbar from "@/app/components/Navbar";
import ImageGallery from "@/app/components/ImageGallery";
import CollegeCard from "./components/CollegeCard";
import ResearchPaper from "./components/ResearchPaper";
import ReviewsSection from "./components/ReviewSection";

export default function Home() {
  const user = localStorage.getItem("user");

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-5">
        {/* Conditionally render CollegeCard and ReviewsSection */}
        {user ? (
          <>
            <CollegeCard />
            <ReviewsSection />
          </>
        ) : (
          <div className="text-center text-xl text-gray-500">
            Please log in to see the college details and reviews.
          </div>
        )}
        <ImageGallery />
        <ResearchPaper />
      </div>
    </div>
  );
}
