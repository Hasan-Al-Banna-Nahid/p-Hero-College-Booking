"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import colleges from "../../../data/colleges"; // Ensure this file exists

const CollegeDetails = () => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop(); // Extract ID from URL

  const college = colleges.find((c) => c.id === id);

  if (!college) {
    return <p className="text-center text-red-500">College not found!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16">
      {/* Image */}
      <div className="w-full h-64 relative">
        <Image
          width={500}
          height={100}
          src={college.image}
          alt={college.name}
          className="rounded-lg"
        />
      </div>

      {/* College Details */}
      <h1 className="text-3xl font-bold mt-4">{college.name}</h1>
      <p>
        <strong>Admission Dates:</strong> {college.admissionDates}
      </p>
      <p>
        <strong>Events:</strong> {college.events.join(", ")}
      </p>
      <p>
        <strong>Research Work:</strong> {college.researchHistory}
      </p>
      <p>
        <strong>Sports:</strong> {college.sports.join(", ")}
      </p>

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default CollegeDetails;
