import { Request, Response } from "express";
import UsersController from "../../controllers/usersController";

async function promoteStudentMiddleware(
  req: Request,
  res: Response
): Promise<any> {
  const studentId = Number(req.params.studentId);
  const newAccessLevel = req.body.newAccessLevel;
  if (res.locals.id === studentId) {
    res.status(500).send({ message: "You cannot promote yourself" });
  }
  const { error, message } = await UsersController.promoteStudent(
    studentId,
    newAccessLevel
  );
  if (error) {
    return res.status(500).send(message);
  }
  return res.send(message);
}

export default promoteStudentMiddleware;
