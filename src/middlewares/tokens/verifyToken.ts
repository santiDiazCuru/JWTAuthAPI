import { Request, Response, NextFunction } from "express";
import UsersController from "../../controllers/usersController";
import TokensController from "../../controllers/tokensController";

async function verifyTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  const authHeader: string = req.headers["authorization"];
  const incomingToken: string = authHeader && authHeader.split(" ")[1];
  if (!incomingToken) {
    return res.status(400).send({ message: "No token" });
  }
  const { id } = TokensController.decodeTokenPayload(incomingToken);
  if (!id) {
    return res.send({ message: "Incorrect Token" });
  }
  const { tokenSalt } = await UsersController.findUserData(id);
  const isTokenCorrect = TokensController.verifyToken(incomingToken, tokenSalt);
  if (!isTokenCorrect) {
    return res.send({ message: "Incorrect Token" });
  }
  res.locals.id = id;
  next();
}

export default verifyTokenMiddleware;
