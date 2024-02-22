import express from "express";
import { json } from "body-parser";

const app = express();

app.use(json());

app.get("/", (req, res) => {
  try {
    return res.json("Hello World");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
