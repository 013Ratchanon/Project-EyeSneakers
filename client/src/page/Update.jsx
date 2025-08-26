import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sneaker, setSneaker] = useState({
    name: "",
    type: "",
    imgUrl: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/v1/sneaker/" + id)
      .then((res) => res.json())
      .then((data) => {
        setSneaker(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSneaker({ ...sneaker, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/sneaker/" + id,
        {
          method: "PUT",
          body: JSON.stringify(sneaker),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Sneaker updated successfully!");
        navigate("/");
      } else {
        alert("Failed to update sneaker.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <svg
          className="animate-spin h-12 w-12 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-600 text-white font-semibold text-xl">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
      <div className="bg-gray-900 bg-opacity-90 max-w-lg w-full rounded-3xl shadow-2xl p-10">
        <h2 className="text-5xl font-extrabold text-center text-white mb-10 tracking-wide drop-shadow-lg">
          Update Sneaker
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-8"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-300 font-semibold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={sneaker.name}
              onChange={handleChange}
              placeholder="Enter sneaker name"
              className="w-full px-5 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-500 transition"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label
              htmlFor="type"
              className="block text-gray-300 font-semibold mb-2"
            >
              Type
            </label>
            <input
              id="type"
              type="text"
              name="type"
              value={sneaker.type}
              onChange={handleChange}
              placeholder="Enter type"
              className="w-full px-5 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-500 transition"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-gray-300 font-semibold mb-2"
            >
              Price (USD)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={sneaker.price || ""}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              className="w-full px-5 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-500 transition"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imgUrl"
              className="block text-gray-300 font-semibold mb-2"
            >
              Image URL
            </label>
            <input
              id="imgUrl"
              type="url"
              name="imgUrl"
              value={sneaker.imgUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full px-5 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-500 transition"
              required
            />
            {sneaker.imgUrl && (
              <div className="mt-6 flex justify-center">
                <img
                  src={sneaker.imgUrl}
                  alt={sneaker.name}
                  className="h-48 rounded-2xl shadow-lg object-cover border-4 border-pink-500 transition-transform hover:scale-105"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-8 mt-8">
            <button
              type="submit"
              className="px-10 py-3 rounded-3xl bg-pink-600 hover:bg-pink-700 transition text-white font-bold text-lg shadow-lg"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-10 py-3 rounded-3xl border-2 border-pink-600 text-pink-500 hover:bg-pink-600 hover:text-white transition font-bold text-lg shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
