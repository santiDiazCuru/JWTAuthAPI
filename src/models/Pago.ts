import { Model, DataTypes } from "sequelize";
import { db } from "./db";

class Pago extends Model {
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public id?: number;
  public campo1!: string;
  public campo2!: string;
  public campo3!: string;
}
Pago.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    campo1: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    campo2: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    campo3: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  { tableName: "pagos", sequelize: db }
);

export default Pago;
