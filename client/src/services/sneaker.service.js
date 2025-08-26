import api from "./api";
const SNEAKER_API = import.meta.env.VITE_SNEAKER_API;

// get all sneakers
const getAllSneakers = async () => {
  return await api.get(SNEAKER_API);
};

// get sneaker by Id
const getSneakerById = async (id) => {
  return await api.get(`${SNEAKER_API}/${id}`);
};

// update sneaker by Id
const editSneakerById = async (id, sneaker) => {
  return await api.put(`${SNEAKER_API}/${id}`, sneaker);
};

// add sneaker
const insertSneaker = async (sneaker) => {
  return await api.post(SNEAKER_API, sneaker);
};

// delete sneaker
const deleteSneaker = async (id) => {
  return await api.delete(`${SNEAKER_API}/${id}`);
};

const SneakerService = {
  getAllSneakers,
  getSneakerById,
  editSneakerById,
  insertSneaker,
  deleteSneaker,
};

export default SneakerService;
