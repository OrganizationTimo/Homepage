import express from "express";
import { json } from "body-parser";
import router from "./routes/users.route";
import { log } from "./middlewares/logging.middleware";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);
app.options("*", cors());
app.use(json());
app.use(log);
app.use(router);

app.listen(process.env.PORT || 3000, async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:28080/");
    console.log("Successfully connected to MongoDB.");
    console.log(`Server listening on port: ${process.env.PORT}.`);
  } catch (err) {
    console.log(err);
  }
});
