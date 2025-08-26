import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Sneaker from "../components/Sneaker";
import SneakerService from "../services/sneaker.service";

const Home = () => {
  const [sneakers, setSneakers] = useState([]);
  const [filteredSneakers, setFilteredSneakers] = useState([]);

  const handleSearch = (keyword) => {
    if (!keyword) {
      setFilteredSneakers(sneakers);
      return;
    }
    const result = sneakers.filter(
      (sneaker) =>
        sneaker.name.toLowerCase().includes(keyword.toLowerCase()) ||
        sneaker.type.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredSneakers(result);
  };

  useEffect(() => {
    const getAllSneakers = async () => {
      try {
        const response = await SneakerService.getAllSneakers();
        if (response.status === 200 && Array.isArray(response.data)) {
          setSneakers(response.data);
          setFilteredSneakers(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Sneakers",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    getAllSneakers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white px-6 py-10">
      {/* Title */}
      {/* <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-100 tracking-wide">
        👟 Sneaker Collection
      </h1> */}

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-lg">
          <input
            type="search"
            name="keyword"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search sneaker or type..."
            className="w-full px-5 py-3 pl-12 rounded-2xl bg-gray-800 text-gray-200 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </div>
      </div>

      {/* Sneakers Card Grid */}
      <div className="max-w-6xl mx-auto">
        <Sneaker sneakers={filteredSneakers} />
      </div>
    </div>
  );
};

export default Home;
