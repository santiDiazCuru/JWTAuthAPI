import meMiddleware from "./me";
import logInMiddleware from "./logIn";
import logOutMiddleware from "./logOut";
import setPassword from "./setPassword";
import registerMiddleware from "./register";
import changeImageMiddleware from "./changeImage";
import deleteStudentMiddleware from "./deleteStudent";
import promoteStudentMiddleware from "./promoteStudent";
import changePasswordMiddleware from "./changePassword";
import forgotPasswordMiddleware from "./forgotPassword";
import verifyAccessLevel2Middleware from "./accessLevel2";
import activateAccountMiddleware from "./activateAccount";
import forgotPasswordVerificationMiddleware from "./forgotPasswordVerification";

export {
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
};
