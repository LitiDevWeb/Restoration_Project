import bcrypt from "bcrypt";

const saltRounds = 5;

export async function hash(text: string) {
  return await bcrypt.hash(text, saltRounds);
}

export async function checkHash(text: string, hash: string) {
  return await bcrypt.compare(text, hash);
}
