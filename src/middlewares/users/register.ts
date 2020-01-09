import { Request, Response } from "express";
import UsersController from "../../controllers/usersController";
import MailingController from "../../controllers/mailingController";
import crypto from "crypto";

async function registerMiddleware(
  req: Request,
  res: Response
): Promise<Response> {
  const {
    name,
    surname,
    email,
    phone,
    password,
    accessLevel,
    slack,
    github,
    codewars,
    img
  } = req.body;
  if (!name || !surname || !email || !phone || !password || !accessLevel) {
    return res.status(400).send({ message: "Missing fields" });
  }
  const lowerCaseEmail = email.toLowerCase();
  const confirmationToken = crypto.randomBytes(20).toString("hex");
  const { error, data, message } = await UsersController.createUser({
    name,
    surname,
    phone,
    password,
    email: lowerCaseEmail,
    accessLevel,
    slack,
    github,
    codewars,
    img,
    confirmationToken
  });
  if (error) {
    return res.status(400).send({ message });
  }
  MailingController.sendConfirmationEmail(confirmationToken, lowerCaseEmail);
  const response = {
    data: { ...data } // Queda así abierto y raro por si despues se agrega el token (falta tiparlo)
  };
  res.send(response);
}

export default registerMiddleware;
