import Image from "next/image";
import notFound from "../../public/images/404.jpg";
const NotFound = () => {
  return (
    <div className="flex items-center mt-8 justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500">
      <div className="text-center p-8 rounded-lg shadow-xl bg-white max-w-lg w-full">
        {/* 404 Error Section */}
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 animate-pulse">
          404
        </h1>
        <p className="text-2xl text-gray-700 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Illustration Section */}
        <div className="mt-8 mb-8">
          <Image
            src={notFound}
            alt="Page not found illustration"
            className="w-72 h-36 mx-auto transform transition-all duration-500 hover:scale-105"
          />
        </div>

        {/* Action Section */}
        <div className="mt-6">
          <p className="text-lg text-gray-500">
            But don't worry, let's get you back on track.
          </p>
          <a
            href="/"
            className="inline-block mt-4 px-6 py-3 text-white font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
