import express from "express";
import { json } from "body-parser";
import router from "./routes/users.route";
import { log } from "./middlewares/logging.middleware";
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./configs/db.config";
import { User } from "./models/user.model";

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
    console.log(`Server listening on port: ${process.env.PORT}.`);

    await client.connect();
    console.log("Successfully connected to PostgreSQL.");

    new User();
  } catch (err) {
    console.log(err);
  }
});
