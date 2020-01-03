import { Request, Response, NextFunction } from "express";
import TokensController from "../../controllers/tokensController";
import UsersController from "../../controllers/usersController";

async function verifyAccessLevel2(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const id = res.locals.id;
  const { accessLevel } = await UsersController.findUserData(id);
  if (accessLevel < 2) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  next();
}

export default verifyAccessLevel2;
