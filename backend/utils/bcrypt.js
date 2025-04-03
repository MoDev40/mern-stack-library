import { hash, compare } from "bcryptjs";

const hashIt = async (planeText, salt = 10) => {
  return await hash(planeText, salt);
};

const compareIt = async (planeText, hashText) => {
  return await compare(planeText, hashText);
};

export { hashIt, compareIt };
