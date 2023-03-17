import jwt from "jsonwebtoken";

const PRIVATE_KEY = "thisismyprivatekey";

export function signToken(data: any) {
  return jwt.sign(data, PRIVATE_KEY);
}

export function decodeToken(token: any) {
  return jwt.verify(token, PRIVATE_KEY);
}
