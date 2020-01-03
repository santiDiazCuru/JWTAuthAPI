import logInMiddleware from "./logIn";
import meMiddleware from "./me";
import logOutMiddleware from "./logOut";
import registerMiddleware from "./register";
import changePasswordMiddleware from "./changePassword";
import changeImageMiddleware from "./changeImage";
import verifyAccessLevel2Middleware from "./accessLevel2";
import deleteStudentMiddleware from "./deleteStudent";
import promoteStudentMiddleware from "./promoteStudent";

export {
  logInMiddleware,
  meMiddleware,
  logOutMiddleware,
  registerMiddleware,
  changePasswordMiddleware,
  changeImageMiddleware,
  verifyAccessLevel2Middleware,
  deleteStudentMiddleware,
  promoteStudentMiddleware
};
