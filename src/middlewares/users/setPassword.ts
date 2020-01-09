import { Request, Response } from "express";
import UsersController from "../../controllers/usersController";

async function setPasswordMiddleware(
  req: Request,
  res: Response
): Promise<any> {
  const email = req.body.email.toLowerCase();
  const confirmationToken = req.params.confirmationtoken;
  const newPassword = req.body.newPassword;
  if (!email || !newPassword) {
    return res.status(400).send({ message: "Missing fields" });
  }
  const { error, message } = await UsersController.setNewPassword(
    email,
    newPassword,
    confirmationToken
  );
  if (error) {
    return res.status(500).send(message);
  }
  return res.send({ message: "New password set correctly" });
}

export default setPasswordMiddleware;
