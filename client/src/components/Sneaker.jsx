import React from "react";
import Card from "./Card";
import { useAuthContext } from "../context/AuthContext";

const Sneaker = ({ sneakers }) => {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-100 tracking-wide">
          👟 Sneaker Collection
        </h1>

        {/* Sneaker Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {user ? (
            sneakers && sneakers.length > 0 ? (
              sneakers.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  imgUrl={item.imgUrl}
                />
              ))
            ) : (
              <div className="text-center text-gray-400 text-lg font-medium bg-gray-800 p-4 rounded-xl shadow-md">
                📭 No content available!
              </div>
            )
          ) : (
            <div className="text-center text-red-400 text-lg font-medium bg-gray-800 p-4 rounded-xl shadow-md">
              🚫 You don't have permission to access this content!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sneaker;
