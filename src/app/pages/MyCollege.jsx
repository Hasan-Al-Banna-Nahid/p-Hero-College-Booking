const MyCollege = () => {
  const [college, setCollege] = useState(null);

  useEffect(() => {
    fetch("/api/my-college")
      .then((res) => res.json())
      .then((data) => setCollege(data));
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result); // Handle the response as needed
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My College</h1>
      {college ? (
        <div>
          <h2 className="text-xl font-bold">{college.name}</h2>
          <p>Admission Dates: {college.admissionDates}</p>
          <p>Events: {college.events.join(", ")}</p>
          <p>Research Works: {college.researchWorks.join(", ")}</p>
          <p>Sports: {college.sports.join(", ")}</p>
        </div>
      ) : (
        <p>No college data found.</p>
      )}
      <form onSubmit={handleReviewSubmit} className="mt-4">
        <textarea
          name="review"
          placeholder="Write a review..."
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          className="w-full p-2 border rounded mt-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default MyCollege;
