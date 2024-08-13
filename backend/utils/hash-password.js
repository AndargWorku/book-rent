import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (plainTextPassword) => {
    console.log(plainTextPassword)
  const hashedPassword = await bcrypt.hash(
    plainTextPassword.toString(),
    saltRounds
  );
  console.log(hashedPassword)
  return hashedPassword;
};

export default hashPassword;