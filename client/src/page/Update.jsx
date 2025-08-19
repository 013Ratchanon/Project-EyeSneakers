import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
const Update = () => {
  //1. Get Id from URL
  const { id } = useParams();
  const [restaurant, setRestaurants] = useState({
    name: "",
    type: "",
    imgUrl: "",
  });
  //2. Get Restaurant by ID
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/restaurants/" + id)
      .then((res) => {
        // convert to json format
        return res.json();
      })
      .then((response) => {
        //save to state
        setRestaurants(response);
      })
      .catch((err) => {
        //catch error
        console.log(err.message);
      });
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurants({ ...restaurant, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/restaurants/" + id,
        {
          method: "PUT",
          body: JSON.stringify(restaurant),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Restaurant Update successfully!!");
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
          Update Restaurant
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
          name="img"
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
        Update
      </button>
      <a href="/" class="btn btn-outline btn-error" type="cancel">
        Cancel
      </a>
    </div>
  );
};

export default Update;
