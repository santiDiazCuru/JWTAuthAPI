import { Request, Response } from "express";
import UsersController from "../../controllers/usersController";

async function forgotPasswordVerificationMiddleware(
  req: Request,
  res: Response
): Promise<Response> {
  const confirmationToken = req.params.confirmationtoken;
  const email = req.params.email;

  const { error, message, data } = await UsersController.confirmToken(
    confirmationToken,
    email
  );
  if (error) {
    return res.status(400).send({ message });
  }
  const response = { message: "Token verified Correctly", email: email };
  res.send(response);
}

export default forgotPasswordVerificationMiddleware;
