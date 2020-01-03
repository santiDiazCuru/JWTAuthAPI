import { Request, Response } from "express";
import UsersController from "../../controllers/usersController";
import TokensController from "../../controllers/tokensController";

async function changeImageMiddleware(
  req: Request,
  res: Response
): Promise<Response> {
  const image = req.body.newImage;
  const id = res.locals.id;
  const { error, message } = await UsersController.changeImage(id, image);
  if (error) {
    return res.status(400).send({ message });
  }
  return res.send(message);
}

export default changeImageMiddleware;
