import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const Card = (props) => {
  const { user } = useAuthContext();
  const [showConfirm, setShowConfirm] = useState(false);

  const Delete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/sneaker/" + id,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 w-80 text-center">
          <p className="mb-4 text-lg font-semibold">{message}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              ตกลง
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleDelete = () => setShowConfirm(true);

  const confirmDelete = (id) => {
    Delete(id);
    setShowConfirm(false);
    alert("ลบเรียบร้อย!");
  };

  const cancelDelete = () => setShowConfirm(false);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-2xl shadow-lg w-80 transform transition hover:scale-105 hover:shadow-2xl overflow-hidden">
      <figure className="relative">
        <img
          src={props.imgUrl}
          alt={props.name}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-2 right-2 bg-gray-700 text-xs px-2 py-1 rounded-lg shadow">
          NEW
        </span>
      </figure>

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-gray-100">{props.name}</h2>
        <p className="text-gray-400">Type: {props.type}</p>

        {/* ✅ แสดงราคา (รองรับ 0 และ format THB) */}
        <p className="text-green-400 font-semibold">
          Price:{" "}
          {props.price !== undefined
            ? Number(props.price).toLocaleString("th-TH", {
                style: "currency",
                currency: "THB",
              })
            : "N/A"}
        </p>

        {(user?.authorities.includes("ROLES_ADMIN") ||
          user?.authorities.includes("ROLES_MODERATOR")) && (
          <div className="flex justify-end gap-2 pt-3">
            {user?.authorities.includes("ROLES_ADMIN") && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                Delete
              </button>
            )}
            <a
              href={`/update/${props.id}`}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-yellow-500 hover:bg-yellow-600 transition"
            >
              Edit
            </a>
          </div>
        )}

        {showConfirm && (
          <ConfirmDialog
            message="ต้องการลบหรือไม่?"
            onConfirm={() => confirmDelete(props.id)}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
