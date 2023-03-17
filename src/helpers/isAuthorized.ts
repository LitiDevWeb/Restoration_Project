import { decodeToken } from "./encryption/jwt";

export function isAuthorized(token: string | undefined) {
  const splitToken = token?.split(" ")[1];

  if (!splitToken) return false;

  try {
    const decoded = decodeToken(splitToken);

    if (!decoded) return false;

    return true;
  } catch (err) {
    return false;
  }
}
