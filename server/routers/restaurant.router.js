import restaurantController from "../controllers/restaurant.controller.js";
import express from "express";

const router = express.Router();
//POST http://localhost:5000/api/v1/restaurant
router.post("/", restaurantController.create);
//GET http://localhost:5000/api/v1/restaurant
router.get("/", restaurantController.getAll);
//GET http://localhost:5000/api/v1/restaurant/:id
router.get("/:id", restaurantController.getById);
//PUT http://localhost:5000/api/v1/restaurant/:id
router.put("/:id", restaurantController.update);
//DELETE http://localhost:5000/api/v1/restaurant/:id
router.delete("/:id", restaurantController.delete);

export default router;
