import * as bcrypt from 'bcrypt';

export const hashPassowrd = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};
