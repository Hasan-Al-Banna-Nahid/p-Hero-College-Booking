const Admission = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/api/admission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result); // Handle the response as needed
  };

  return (
    <div className="container mx-auto p-8 max-w-lg">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Admission Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Candidate Name"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Candidate Email"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Candidate Phone Number"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>
        <div>
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>
        <div>
          <input
            type="file"
            name="image"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admission;
