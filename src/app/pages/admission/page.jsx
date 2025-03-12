import Link from "next/link";
import colleges from "@/app/data/colleges"; // Import college data

const AdmissionPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Select Your College for Admission
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 p-6 text-center group"
          >
            <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 mb-4">
              {/* Optional College Image */}
              <img
                src={college.image}
                alt={college.name}
                className="object-cover w-full h-full rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {college.name}
            </h3>
            <Link href={`/pages/admission/${college.id}`}>
              <button className="mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105">
                Apply Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionPage;
