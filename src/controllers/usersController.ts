import User from "../models/User";

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
  confirmationToken: string;
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

interface IActivateAccountResponse {
  error: boolean;
  message: string;
  data: null | User;
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
        img,
        confirmationToken
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
          img,
          confirmationToken
        }
      };
      return response;
    } catch (err) {
      return { error: true, message: err.toString(), data: null };
    }
  }

  public async findUserData(id: number): Promise<any> {
    const user = await User.findByPk(id);
    if (!user) {
      return { error: true, message: "No user found", tokenSalt: null };
    }
    return { error: false, message: "", tokenSalt: user.tokenSalt };
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

  public async activateAccount(
    confirmationToken: string
  ): Promise<IActivateAccountResponse> {
    const user = await User.findOne({
      where: {
        confirmationToken: confirmationToken
      }
    });
    if (!user) {
      return { error: true, message: "No user found", data: null };
    }
    user.active = true;
    await user.save();
    return { error: false, message: "Done", data: user };
  }

  public async generateNewConfirmationToken(email: string): Promise<any> {
    const user = await User.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      return { error: true, message: "No user found", data: null };
    }
    try {
      const confirmationToken = await user.createConfirmationToken();
      const response = {
        error: false,
        message: "",
        data: {
          confirmationToken
        }
      };
      return response;
    } catch (err) {
      return { error: true, message: "Database Error", data: null };
    }
  }

  public async confirmToken(
    confirmationToken: string,
    email: string
  ): Promise<any> {
    const user = await User.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      return { error: true, message: "No user found", data: null };
    }
    if (user.confirmationToken !== confirmationToken) {
      return { error: true, message: "Incorrect Token", data: null };
    }
    return { error: false, message: "", data: null };
  }

  public async setNewPassword(
    email: string,
    newPassword: string,
    confirmationToken: string
  ): Promise<any> {
    const user = await User.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      return { error: true, message: "No user found", data: null };
    }
    if (user.confirmationToken !== confirmationToken) {
      return { error: true, message: "Wrong token", data: null };
    }
    await user.setNewPassword(newPassword);
    return { error: false, message: "", data: null };
  }
}

export default new UsersController();
