import express from "express";
import { json } from "body-parser";
import router from "./routes/users.route";
import { log } from "./middlewares/logging.middleware";
const app = express();

app.use(json());
app.use(log);
app.use(router);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
