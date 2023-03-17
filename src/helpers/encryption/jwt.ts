import jwt from "jsonwebtoken";

export function signToken(data: any) {
  return jwt.sign(data, process.env.JWT_KEY as string);
}

export function decodeToken(token: any) {
  return jwt.verify(token, process.env.JWT_KEY as string);
}
