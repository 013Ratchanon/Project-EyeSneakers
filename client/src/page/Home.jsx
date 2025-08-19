import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Restaurants from "../components/Restaurants";
import RestaurantSevice from "../services/restaurant.service";
const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  // const [keyword, setKeyword] = useState("");
  const [filterdRestaurants, setfilterdRestaurants] = useState([]);

  const handleSearch = (keyword) => {
    if (keyword === "") {
      setfilterdRestaurants(restaurants);
      return;
    }
    const result = restaurants.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.type.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    setfilterdRestaurants(result);
    // console.log(result);
  };
  useEffect(() => {
    const getAllRestaurants = async () => {
      try {
        const response = await RestaurantSevice.getAllRestaurants();
        if (response.status === 200) {
          setRestaurants(response.data); // 🔍 อย่าลืมเช็คว่า response.data เป็น array
          setfilterdRestaurants(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All restaurants",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    getAllRestaurants(); // ✅ เรียกใช้หลังประกาศเสร็จ
  }, []);

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="title justify-center text-3xl text-center m-5 p5 ">
          Grab Restaurant
        </h1>
      </div>

      <div className="mb-5 flex justify-center items-center max-w-screen">
        <label className="input flex items-center gap-2 w-xl">
          <svg
            className="h-[1em] opacity-50"
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
          <input
            type="search"
            name="keyword"
            onChange={(e) => handleSearch(e.target.value)}
            required
            placeholder="Search"
          />
        </label>
      </div>

      <Restaurants restaurants={filterdRestaurants} />
    </div>
  );
};

export default Home;
