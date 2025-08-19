import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useAuthContext } from "../context/AuthContext";
const AddRestaurant = () => {
  const { user } = useAuthContext();
  const [restaurant, setRestaurants] = useState({
    name: "",
    type: "",
    imgUrl: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurants({ ...restaurant, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/restaurants/",
        {
          method: "POST",
          body: JSON.stringify(restaurant),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Restaurant added successfully!!");
        setRestaurants({
          name: "",
          type: "",
          imgUrl: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="container mx-auto">
      <div>
        <h4 className="title justify-center text-3xl text-center m-5 p5 ">
          Add Restaurant
        </h4>
      </div>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">What is your name?</legend>
        <input
          type="text"
          name="name"
          value={restaurant.name}
          onChange={handleChange}
          placeholder="name"
          class="input input-secondary"
        />
        <legend class="fieldset-legend">What is your type?</legend>
        <input
          type="text"
          name="type"
          value={restaurant.type}
          onChange={handleChange}
          placeholder="Type"
          class="input input-primary"
        />
        <legend class="fieldset-legend">What is your img?</legend>
        <input
          type="text"
          name="imgUrl"
          value={restaurant.imgUrl}
          onChange={handleChange}
          placeholder="Img"
          class="input input-info"
        />
        {restaurant.imgUrl && (
          <div className="flex item-center gap-2">
            <img className="h-32" src={restaurant.imgUrl} />
          </div>
        )}
      </fieldset>
      <button
        onClick={handleSubmit}
        class="btn btn-outline btn-success"
        type="submit"
      >
        Add
      </button>
      <button class="btn btn-outline btn-error" type="cancel">
        Cancel
      </button>
    </div>
  );
};

export default AddRestaurant;
