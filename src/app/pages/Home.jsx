import CollegeCard from "../components/CollegeCard";
import ImageGallery from "../components/ImageGallery";
import ReviewSection from "../components/ReviewSection";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const colleges = [
    {
      id: 1,
      name: "College A",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      admissionDates: "2025-03-15",
      events: ["Cultural Fest", "Tech Symposium"],
      researchHistory: "10 Research Papers Published",
      sports: ["Football", "Basketball"],
    },
    // Add more colleges
  ];

  return (
    <div className="container mx-auto p-4">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {colleges.slice(0, 3).map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>
      <ImageGallery />
      <ReviewSection />
    </div>
  );
};

export default Home;
