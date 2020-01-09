import { Request, Response, NextFunction } from "express";
import UsersController from "../../controllers/usersController";

async function activateAccountMiddleware(
  req: Request,
  res: Response
): Promise<Response> {
  const confirmationToken = req.params.confirmationtoken;
  const { error, message, data } = await UsersController.activateAccount(
    confirmationToken
  );
  if (error) {
    return res.status(500).send(message);
  }
  const {
    name,
    surname,
    phone,
    email,
    accessLevel,
    slack,
    github,
    codewars,
    img
  } = data;
  const response = {
    data: {
      name,
      surname,
      phone,
      email,
      accessLevel,
      slack,
      github,
      codewars,
      img
    }
  };
  return res.send(response);
}

export default activateAccountMiddleware;
