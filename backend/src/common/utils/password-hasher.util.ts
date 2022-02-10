import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = 10;
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePasswords = async (
  password: string,
  passwordEncrypted: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, passwordEncrypted);
  return isMatch;
};
