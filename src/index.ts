import express from "express";
import { db } from "./models";
import User from "./models/User";
import Router from "./routes/index";
const app = express();

app.use(express.json());
const algo = { User };
app.use("/", Router);

db.sync({ force: false }).then(() =>
  app.listen(3000, () => console.log("listenning on port 3000"))
);
