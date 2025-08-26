import sneakerController from "../controllers/sneaker.controller.js";
import express from "express";

const router = express.Router();
//POST http://localhost:5000/api/v1/sneaker
router.post("/", sneakerController.create);
//GET http://localhost:5000/api/v1/sneaker
router.get("/", sneakerController.getAll);
//GET http://localhost:5000/api/v1/sneaker/:id
router.get("/:id", sneakerController.getById);
//PUT http://localhost:5000/api/v1/sneaker/:id
router.put("/:id", sneakerController.update);
//DELETE http://localhost:5000/api/v1/sneaker/:id
router.delete("/:id", sneakerController.delete);

export default router;
