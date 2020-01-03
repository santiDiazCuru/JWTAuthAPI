import User from "../models/User";
import TokensController from "../controllers/tokensController";
import { userInfo } from "os";

interface IuserData {
  id: number;
  name: string;
  surname: string;
  phone: string;
  accessLevel: number;
  email: string;
  slack: string;
  github: string;
  codewars: string;
  img: string;
  tokenSalt: string;
}

interface IUserDataForRegister {
  name: string;
  surname: string;
  phone: string;
  accessLevel: number;
  email: string;
  password: string;
  slack: string | undefined;
  github: string | undefined;
  codewars: string | undefined;
  img: string | undefined;
}

interface IRegisterUserDataResponse {
  name: string;
  surname: string;
  phone: string;
  accessLevel: number;
  email: string;
  slack: string | null;
  github: string | null;
  codewars: string | null;
  img: string | null;
}

interface IRegisterUserResponse {
  error: boolean;
  message: string | null;
  data: null | IRegisterUserDataResponse;
}

interface IvalidateUserResponse {
  error: boolean;
  message: string | null;
  data: null | IuserData;
}

interface IChangePasswordResponse {
  error: boolean;
  message: string;
}

class UsersController {
  public async validateUser(
    email: string,
    password: string
  ): Promise<IvalidateUserResponse> {
    try {
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      if (!user) {
        return { error: true, message: "Wrong email", data: null };
      }
      if (!user.validatePswd(password)) {
        return { error: true, message: "Wrong password", data: null };
      }
      const {
        id,
        name,
        surname,
        accessLevel,
        phone,
        slack,
        github,
        codewars,
        img,
        tokenSalt
      } = user;
      const response = {
        error: false,
        message: null,
        data: {
          id,
          name,
          surname,
          accessLevel,
          phone,
          email,
          slack,
          github,
          codewars,
          img,
          tokenSalt
        }
      };
      return response;
    } catch (err) {
      return { error: true, message: err.toString(), data: null };
    }
  }

  public async createUser(
    data: IUserDataForRegister
  ): Promise<IRegisterUserResponse> {
    const newUserEmail: string = data.email;
    const existingUser = await User.findOne({
      where: {
        email: newUserEmail
      }
    });
    if (existingUser) {
      return {
        error: true,
        message: "Email already belongs to other user",
        data: null
      };
    }
    try {
      const {
        id,
        name,
        surname,
        email,
        phone,
        accessLevel,
        slack,
        github,
        codewars,
        img
      } = await User.create(data);
      const response = {
        error: false,
        message: null,
        data: {
          id,
          name,
          surname,
          email,
          phone,
          accessLevel,
          slack,
          github,
          codewars,
          img
        }
      };
      return response;
    } catch (err) {
      return { error: true, message: err.toString(), data: null };
    }
  }

  public async findUserData(id: number): Promise<User> {
    const user = await User.findByPk(id);
    return user;
  }

  public async refreshUserSalt(id: number): Promise<void> {
    const user = await User.findByPk(id);
    user.refreshTokenSalt();
  }

  public async changepassword(
    oldPassword: string,
    newPassword: string,
    id: number
  ): Promise<IChangePasswordResponse> {
    const user = await User.findByPk(id);
    const response = await user.changePassword(oldPassword, newPassword);
    return response;
  }

  public async changeImage(
    id: number,
    newImage: string
  ): Promise<IChangePasswordResponse> {
    try {
      const user = await User.findByPk(id);
      user.img = newImage;
      await user.save();
      return { error: false, message: "Done" };
    } catch (err) {
      return { error: true, message: err.toString() };
    }
  }

  public async deleteStudent(studentId: number): Promise<any> {
    try {
      await User.destroy({
        where: {
          id: studentId
        }
      });
      return { error: false, message: "Destroyed student " + studentId };
    } catch (err) {
      return { error: true, message: err };
    }
  }

  public async promoteStudent(
    studentId: number,
    newAccessLevel: number
  ): Promise<any> {
    try {
      const user = await User.findByPk(studentId);
      user.accessLevel = newAccessLevel;
      await user.save();
      return { error: false, message: "Student " + studentId + " promoted" };
    } catch (err) {
      return { error: true, message: err };
    }
  }
}

export default new UsersController();
