import jwt from "jsonwebtoken";

const generateToken = (userName) => {
  const expiresIn = "1h";
  const secretKey = process.env.SECRET_KEY;

  const token = jwt.sign({ userName }, secretKey, { expiresIn });

  return token;
};

export default generateToken;