import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
const Card = (props) => {
  const { user } = useAuthContext();
  const Delete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/restaurants/" + id,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // alert("Restaurant Delete successfully!!");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    dialog: {
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      color: "red",
    },
  };

  const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="z-50" style={styles.overlay}>
        <div style={styles.dialog} className="space-x-4 space-y-2">
          <p>{message}</p>
          <button
            onClick={onConfirm}
            className="border px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-700 cursor-pointer"
          >
            ตกลง
          </button>
          <button
            onClick={onCancel}
            className="border px-4 py-2 bg-red-500 text-white hover:bg-red-700 cursor-pointer"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    );
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = (id) => {
    // console.log(id)
    Delete(id);
    setShowConfirm(false);
    alert("ลบเรียบร้อย!");
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={props.imgUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {props.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{props.type}</p>
        {user && user.authorities.includes("ROLES_ADMIN") && (
          <div className="card-actions justify-end">
            <div onClick={handleDelete} className="btn btn-outline btn-error">
              Delete
            </div>
            <a
              href={"/update/" + props.id}
              className="btn btn-outline btn-warning"
            >
              Edit
            </a>
            {showConfirm && (
              <ConfirmDialog
                message="ต้องการลบหรือไม่"
                onConfirm={() => confirmDelete(props.id)}
                onCancel={cancelDelete}
              />
            )}
          </div>
        )}
        {user && user.authorities.includes("ROLES_MODERATOR") && (
          <div className="card-actions justify-end">
            <a
              href={"/update/" + props.id}
              className="btn btn-outline btn-warning"
            >
              Edit
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
