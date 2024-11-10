import bcrypt from 'bcrypt';

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
