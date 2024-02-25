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
    if (process.env.MONGO_URI)
      await mongoose.connect(process.env.MONGO_URI, { dbName: "database" });
    console.log("MONGO_URI:", process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB.");
    console.log(`Server listening on port: ${process.env.PORT}.`);
  } catch (err) {
    console.log(err);
  }
});
