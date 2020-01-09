import express from "express";
import {
  setPassword,
  meMiddleware,
  logInMiddleware,
  logOutMiddleware,
  registerMiddleware,
  changeImageMiddleware,
  deleteStudentMiddleware,
  forgotPasswordMiddleware,
  promoteStudentMiddleware,
  changePasswordMiddleware,
  activateAccountMiddleware,
  verifyAccessLevel2Middleware,
  forgotPasswordVerificationMiddleware
} from "../../middlewares/users/index";
import { verifyTokenMiddleware } from "../../middlewares/tokens";

const Router = express.Router();

// GET

Router.get("/me", meMiddleware);
Router.get("/logout", logOutMiddleware);
Router.get("/validate/:confirmationtoken", activateAccountMiddleware);
Router.get(
  "/forgotpassword/:confirmationtoken/:email",
  forgotPasswordVerificationMiddleware
);

// POST

Router.post("/login", logInMiddleware);
Router.post("/register", registerMiddleware);
Router.post("/setPassword/:confirmationtoken", setPassword);
Router.post("/forgotpassword", forgotPasswordMiddleware);
Router.post("/changeimage", verifyTokenMiddleware, changeImageMiddleware);
Router.post("/changepassword", verifyTokenMiddleware, changePasswordMiddleware);
Router.post(
  "/forgotpassword/:confirmationtoken/:email",
  forgotPasswordVerificationMiddleware
);
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
