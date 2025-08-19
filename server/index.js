import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
import sneakerRouter from "./routers/sneaker.router.js";
import cors from "cors";
import authRouter from "./routers/auth.router.js";

app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import db from "./models/index.js";

const role = db.Role;
const innitRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};
// db.sequelize.sync({ force: true }).then(() => {
//   innitRole();
//   console.log("Drop and Sync");
// });

app.get("/", (req, res) => {
  res.send("Sneakers Restful API ");
});

//use routers
app.use("/api/v1/sneaker", sneakerRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
