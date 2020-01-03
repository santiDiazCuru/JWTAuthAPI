import express from "express";
import { verifyTokenMiddleware } from "../../middlewares/tokens";
import {
  logInMiddleware,
  meMiddleware,
  logOutMiddleware,
  registerMiddleware,
  changePasswordMiddleware,
  changeImageMiddleware,
  verifyAccessLevel2Middleware,
  deleteStudentMiddleware,
  promoteStudentMiddleware
} from "../../middlewares/users/index";

const Router = express.Router();

// GET

Router.get("/me", meMiddleware);
Router.get("/logout", logOutMiddleware);

// POST

Router.post("/login", logInMiddleware);
Router.post("/register", registerMiddleware);
Router.post("/changeimage", verifyTokenMiddleware, changeImageMiddleware);
Router.post("/changepassword", verifyTokenMiddleware, changePasswordMiddleware);
Router.post(
  "/promote/:studentId",
  verifyTokenMiddleware,
  verifyAccessLevel2Middleware,
  promoteStudentMiddleware
);

// DELETE

Router.delete(
  "/:studentId",
  verifyTokenMiddleware,
  verifyAccessLevel2Middleware,
  deleteStudentMiddleware
);

export default Router;
