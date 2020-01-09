import User from "./User";
import Pago from "./Pago";

User.hasOne(Pago);

const Models = { User, Pago };
export default Models;
