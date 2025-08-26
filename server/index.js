import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sneakerRouter from "./routers/sneaker.router.js";
import authRouter from "./routers/auth.router.js";
import db from "./models/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const role = db.Role;

const innitRole = async () => {
  const count = await role.count();
  if (count === 0) {
    await role.bulkCreate([
      { id: 1, name: "user" },
      { id: 2, name: "moderator" },
      { id: 3, name: "admin" },
    ]);
    console.log("Roles initialized");
  }
};

app.get("/", (req, res) => {
  res.send("Sneakers Restful API");
});

// use routers
app.use("/api/v1/sneaker", sneakerRouter);
app.use("/api/v1/auth", authRouter);

// start server หลังจาก DB พร้อม + role ถูกสร้าง
const startServer = async () => {
  await db.sequelize.sync({ alter: true });
  await innitRole();
  app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
  });
};

startServer();
