import { Request, Response } from "express";
import UsersController from "../../controllers/usersController";
import TokensController from "../../controllers/tokensController";
import User from "../../models/User";

async function changePasswordMiddleware(
  req: Request,
  res: Response
): Promise<Response> {
  const id = res.locals.id;
  const { oldPassword, newPassword } = req.body;
  const { error, message } = await UsersController.changepassword(
    oldPassword,
    newPassword,
    id
  );
  if (error) {
    return res.status(400).send({ message });
  }
  return res.send(message);
}

export default changePasswordMiddleware;
