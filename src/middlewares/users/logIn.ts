import { Request, Response } from "express";
import UsersController from "../../controllers/usersController";
import TokensController from "../../controllers/tokensController";

interface IReqBody {
  email: string;
  password: string;
}
interface IUserDataForResponse {
  name: string;
  surname: string;
  email: string;
  phone: string;
  accessLevel: number;
}
interface Iresponse {
  token: string;
  data: IUserDataForResponse;
}

async function logInMiddleware(req: Request, res: Response): Promise<Response> {
  const { email, password }: IReqBody = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "Missing fields" });
  }
  const lowerCaseEmail = email.toLowerCase();
  const { error, data, message } = await UsersController.validateUser(
    lowerCaseEmail,
    password
  );
  if (error) {
    return res.status(400).send({ message });
  }
  const { tokenSalt, ...remainigFields } = data;
  const token = TokensController.generateToken(tokenSalt, remainigFields.id);
  const response: Iresponse = {
    token,
    data: { ...remainigFields, email: lowerCaseEmail }
  };
  res.send(response);
}

export default logInMiddleware;
