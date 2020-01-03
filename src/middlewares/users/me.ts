import { Request, Response } from "express";
import UsersController from "../../controllers/usersController";
import TokensController from "../../controllers/tokensController";

interface IUserDataResponse {
  name: string;
  surname: string;
  accessLevel: number;
  phone: string;
  email: string;
  slack: string;
  github: string;
  codewars: string;
  img: string;
}

async function getUserInfo(req: Request, res: Response): Promise<Response> {
  const authHeader: string = req.headers["authorization"];
  const incomingToken: string = authHeader && authHeader.split(" ")[1];
  if (!incomingToken) {
    return res.status(400).send({ message: "No token" });
  }
  const { id } = TokensController.decodeTokenPayload(incomingToken);
  if (!id) {
    return res.send({ message: "Incorrect Token" });
  }
  const {
    name,
    surname,
    accessLevel,
    phone,
    email,
    slack,
    github,
    codewars,
    img,
    tokenSalt
  } = await UsersController.findUserData(id);
  const isTokenCorrect = TokensController.verifyToken(incomingToken, tokenSalt);
  if (!isTokenCorrect) {
    return res.send({ message: "Incorrect Token" });
  }
  const response: IUserDataResponse = {
    name,
    surname,
    accessLevel,
    phone,
    email,
    slack,
    github,
    codewars,
    img
  };
  res.send(response);
}

export default getUserInfo;
