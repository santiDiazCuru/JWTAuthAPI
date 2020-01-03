import jwt from "jsonwebtoken";

class TokensController {
  public generateToken(tokenSalt: string, id: number): string {
    const token: string = jwt.sign({ id }, tokenSalt);
    return token;
  }
  public decodeTokenPayload(token: string): any {
    const id = jwt.decode(token);
    if (!id) {
      return null;
    }
    return id;
  }
  public verifyToken(token: string, tokenSalt: string): boolean {
    try {
      jwt.verify(token, tokenSalt);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export default new TokensController();
