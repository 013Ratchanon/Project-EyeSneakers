import api from "./api";
const RESTO_API = import.meta.env.VITE_RESTO_API;

//get all restaurant
const getAllRestaurants = async () => {
  return await api.get(RESTO_API);
};
//get rastaurant by Id
const getRestaurantById = async (id) => {
  return await api.get(`${RESTO_API}/${id}`);
};
//update restaurant by Id
const editRestaurantById = async (id, restaurant) => {
  return await api.put(`${RESTO_API}/${id}`, restaurant);
};
//add restaurant
const deleteRestaurant = async (restaurant) => {
  return await api.post($RESTO_API, restaurant);
};
//delete restaurant
const insertRestaurant = async (id) => {
  return await api.delete(`${RESTO_API}/${id}`);
};

const RestaurantSevice = {
  getAllRestaurants,
  getRestaurantById,
  editRestaurantById,
  deleteRestaurant,
  insertRestaurant,
};

export default RestaurantSevice;
