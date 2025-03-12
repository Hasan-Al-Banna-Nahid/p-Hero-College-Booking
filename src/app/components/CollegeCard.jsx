"use client";
import { useState } from "react";
import colleges from "../data/colleges";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Link from "next/link";

const CollegeList = () => {
  const [filteredColleges, setFilteredColleges] = useState(colleges);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredColleges(colleges);
      return;
    }

    const filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredColleges(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 mt-6">
        {filteredColleges.length > 0 ? (
          filteredColleges.map((college) => (
            <div
              key={college.id}
              className="group relative border rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100"
            >
              <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96">
                <Image
                  src={college.image}
                  width={500}
                  height={300}
                  alt={college.name}
                  className="object-cover w-full h-full rounded-t-xl"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black opacity-40" />
              </div>
              <div className="absolute inset-0 flex justify-center items-center p-4">
                <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold opacity-90 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  {college.name}
                </h2>
              </div>
              <div className="p-4 bg-white rounded-b-xl flex justify-center">
                <Link href={`/pages/colleges/${college.id}`}>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-lg font-semibold transform hover:scale-105 transition duration-200 ease-in-out shadow-lg">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No colleges found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CollegeList;
