import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const AddSneaker = () => {
  const { user } = useAuthContext();
  const [sneaker, setSneaker] = useState({
    name: "",
    type: "",
    imgUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSneaker({ ...sneaker, [name]: value });
  };

  const handleSubmit = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "You must be logged in to add a sneaker!",
      });
      return;
    }

    try {
      const API_URL =
        import.meta.env.VITE_BASE_URL + import.meta.env.VITE_SNEAKER_API;

      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(sneaker),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Sneaker added!",
          text: "Sneaker added successfully!!",
        });
        setSneaker({ name: "", type: "", imgUrl: "" });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data?.message || "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center mb-8">
          Add Sneaker
        </h2>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold">Sneaker Name</label>
            <input
              type="text"
              name="name"
              value={sneaker.name}
              onChange={handleChange}
              placeholder="Enter sneaker name"
              className="w-full px-4 py-3 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block mb-2 font-semibold">Type</label>
            <input
              type="text"
              name="type"
              value={sneaker.type}
              onChange={handleChange}
              placeholder="Enter type"
              className="w-full px-4 py-3 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-semibold">Image URL</label>
            <input
              type="text"
              name="imgUrl"
              value={sneaker.imgUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-3 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {sneaker.imgUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={sneaker.imgUrl}
                  alt="Preview"
                  className="h-32 rounded-xl shadow-md object-cover"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 rounded-xl border border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => setSneaker({ name: "", type: "", imgUrl: "" })}
              className="px-6 py-3 rounded-xl border border-red-500 text-red-400 hover:bg-red-500 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSneaker;
