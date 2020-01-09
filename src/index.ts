import express from "express";
import { db } from "./models/db";
import Models from "./models/index";
import Router from "./routes/index";
const app = express();

app.use(express.json());
const user = Models.User;
const pago = Models.Pago;
app.use("/", Router);

db.sync({ force: false }).then(() =>
  app.listen(3000, () => console.log("listenning on port 3000"))
);
