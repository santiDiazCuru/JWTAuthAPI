import { Model, DataTypes } from "sequelize";
import { db } from "./index";
import crypto from "crypto";

class User extends Model {
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public id?: number;
  public name!: string;
  public surname!: string;
  public email!: string;
  public phone!: string;
  public accessLevel!: number;
  public password!: string;
  public salt!: string;
  public tokenSalt!: string;
  public slack!: string | null;
  public github!: string | null;
  public codewars!: string | null;
  public img!: string | null;
  public active!: boolean;
  public confirmationToken!: string;

  public hashFunction: (pswd: string) => string;
  public refreshTokenSalt: () => void;
  public changePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<{ error: boolean; message: string }>;
  public validatePswd: (pswd: string) => boolean;
  public activateAccount: () => void;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    surname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    phone: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true
      },
      set(val: string) {
        const onlyNumbersPhone: string = val.replace(/\D/g, "");
        this.setDataValue("phone", onlyNumbersPhone);
      }
    },
    accessLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    salt: {
      type: new DataTypes.STRING(128),
      validate: {
        notEmpty: true
      }
    },
    tokenSalt: {
      type: new DataTypes.STRING(128),
      validate: {
        notEmpty: true
      }
    },
    slack: {
      type: new DataTypes.STRING(128)
    },
    github: {
      type: new DataTypes.STRING(128)
    },
    codewars: {
      type: new DataTypes.STRING(128)
    },
    img: {
      type: new DataTypes.STRING(128)
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    confirmationToken: {
      type: new DataTypes.STRING(128)
    }
  },
  { tableName: "users", sequelize: db }
);

User.beforeCreate(user => {
  user.salt = crypto.randomBytes(64).toString("hex");
  user.tokenSalt = crypto.randomBytes(64).toString("hex");
  user.confirmationToken = crypto.randomBytes(10).toString("hex");
  user.password = user.hashFunction(user.salt + user.password);
});

User.prototype.hashFunction = function(pswd) {
  return crypto
    .createHmac("sha1", this.salt)
    .update(pswd)
    .digest("hex");
};
User.prototype.refreshTokenSalt = async function() {
  this.tokenSalt = crypto.randomBytes(64).toString("hex");
  await this.save();
};

User.prototype.validatePswd = function(pswd) {
  const toValidate: string = this.salt + pswd;
  return this.hashFunction(toValidate) === this.password;
};

User.prototype.activateAccount = async function() {
  this.active = true;
  await this.save();
};

User.prototype.changePassword = async function(oldPassword, newPassword) {
  if (this.validatePswd(oldPassword)) {
    this.password = this.hashFunction(this.salt + newPassword);
    await this.save();
    return { error: false, message: "Done" };
  } else {
    return { error: true, message: "Incorrect password" };
  }
};

export default User;
