import { Request, Response } from "express";
import MailingController from "../../controllers/mailingController";
import UsersController from "../../controllers/usersController";

async function forgotPasswordMiddleware(
  req: Request,
  res: Response
): Promise<any> {
  const email = req.body.email.toLowerCase();
  if (!email) {
    return res.status(400).send({ message: "Missing email" });
  }
  const {
    error,
    message,
    data
  } = await UsersController.generateNewConfirmationToken(email);
  if (error) {
    return res.status(500).send(message);
  }
  MailingController.sendForgotPasswordLink(email, data.confirmationToken);
  res.send({ message: "Email sent" });
}

export default forgotPasswordMiddleware;
