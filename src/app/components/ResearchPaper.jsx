import { useState } from "react";
import { FaFileAlt, FaSearch } from "react-icons/fa"; // Research and search icons

const researchPapers = [
  {
    collegeId: "1",
    title: "Quantum Computing: The Future of Computing",
    description:
      "A study on the advancements and potential future applications of Quantum Computing.",
    link: "https://harvard.edu/research/quantum-computing-paper",
  },
  {
    collegeId: "2",
    title: "Space Exploration and Its Impact on Future Technologies",
    description:
      "Stanford's exploration into the benefits and challenges of human space exploration.",
    link: "https://stanford.edu/research/space-exploration-paper",
  },
  {
    collegeId: "3",
    title: "Robotics in Modern Manufacturing",
    description:
      "MIT's research on robotics systems and their role in enhancing manufacturing efficiency.",
    link: "https://mit.edu/research/robotics-manufacturing-paper",
  },
  {
    collegeId: "4",
    title: "Medical Breakthroughs in Biotechnology",
    description:
      "Oxford University’s groundbreaking research in biotechnology for medical purposes.",
    link: "https://oxford.edu/research/biotech-medical-breakthroughs",
  },
  {
    collegeId: "5",
    title: "Climate Change and Sustainable Solutions",
    description:
      "Cambridge's research on the effects of climate change and sustainable solutions for the future.",
    link: "https://cambridge.edu/research/climate-change-sustainable-solutions",
  },
  {
    collegeId: "6",
    title: "AI and Its Role in Modern Healthcare",
    description:
      "Yale University’s study on the use of AI in transforming modern healthcare practices.",
    link: "https://yale.edu/research/ai-healthcare-paper",
  },
];

const ResearchPaperCard = ({ paper }) => {
  return (
    <div className="transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg shadow-lg p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 hover:from-blue-200 hover:via-purple-200 hover:to-pink-200">
      <div className="flex items-center space-x-4 mb-3">
        <FaFileAlt className="text-4xl text-indigo-600" />
        <h3 className="text-2xl font-semibold text-gray-800">{paper.title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4">{paper.description}</p>
      <div className="text-center">
        <a href={paper.link} target="_blank" rel="noopener noreferrer">
          <button className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transform transition-all hover:scale-105 hover:from-indigo-700 hover:to-indigo-900 duration-300 ease-in-out">
            Read Full Paper
          </button>
        </a>
      </div>
    </div>
  );
};

const ResearchPapersSection = () => {
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);

  const handleCollegeChange = (e) => {
    setSelectedCollegeId(e.target.value);
  };

  const filteredPapers = selectedCollegeId
    ? researchPapers.filter((paper) => paper.collegeId === selectedCollegeId)
    : researchPapers;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Research Papers by College Students
      </h2>

      <div className="mb-8 text-center">
        <label htmlFor="college" className="font-semibold text-lg mr-4">
          Filter by College:
        </label>
        <select
          id="college"
          className="p-3 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedCollegeId || ""}
          onChange={handleCollegeChange}
        >
          <option value="">All Colleges</option>
          <option value="1">Harvard University</option>
          <option value="2">Stanford University</option>
          <option value="3">MIT</option>
          <option value="4">Oxford University</option>
          <option value="5">Cambridge University</option>
          <option value="6">Yale University</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPapers.length > 0 ? (
          filteredPapers.map((paper) => (
            <ResearchPaperCard key={paper.link} paper={paper} />
          ))
        ) : (
          <div className="col-span-full text-center p-8 bg-gray-100 rounded-lg shadow-lg">
            <FaSearch className="text-6xl text-gray-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Research Papers Found
            </h3>
            <p className="text-gray-500 mb-6">
              It seems there are no papers available for this college yet. Try
              selecting another college.
            </p>
            <a href="/" passHref>
              <button className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300 ease-in-out hover:from-indigo-700 hover:to-indigo-900">
                Back to Home
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchPapersSection;
