import bcrypt from "bcryptjs";

// Função para gerar hash da senha
export const handlePasswordHash = async (passwordPlainText) => {
  const saltRounds = 12;
  return await bcrypt.hash(passwordPlainText, saltRounds);
};

// Função para comparar senha com hash
export const handlePasswordCompare = async (
  passwordPlainText,
  passwordHash
) => {
  return await bcrypt.compare(passwordPlainText, passwordHash);
};
