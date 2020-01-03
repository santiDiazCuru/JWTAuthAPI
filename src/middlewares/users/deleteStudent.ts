import { Request, Response } from "express";
import UsersController from "../../controllers/usersController";

async function deleteStudentMiddleware(
  req: Request,
  res: Response
): Promise<any> {
  const studentId = Number(req.params.studentId);
  if (res.locals.id === studentId) {
    res.status(500).send({ message: "You cannot delete yourself" });
  }
  const { error, message } = await UsersController.deleteStudent(studentId);
  if (error) {
    return res.status(500).send(message);
  }
  return res.send(message);
}

export default deleteStudentMiddleware;
