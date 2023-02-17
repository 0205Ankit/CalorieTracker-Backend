import express from "express";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes"; //???
import morgan from "morgan";
import cors from "cors";
import globalRoutes from "./routes";
import logger from './helpers/logger'
import database from "./db/connect";
import User from "./app/users/user.entity";

dotenv.config();

// init app
const PORT = process.env.PORT || 5000;
const app = express();

//init middlewares
app.use(express.json()); //????
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.get('/ankit', (req, res) => {
//   const users = User.find()
//   return res.json(users)

// })

app.use("/api", globalRoutes);///????


app.listen(PORT, () => {
  database.initDB()
  logger.info(`App running at http://localhost:${PORT}`);
});
