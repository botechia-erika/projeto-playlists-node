import bcrypt from 'bcryptjs';
export const handlePasswordHash = (passwordPlainText) => {

    const saltRounds = 12;
    
    return new Promise((resolve, reject) => {
        bcrypt.hash(passwordPlainText, saltRounds, (err, hash) => {
        if (err) {
            return reject(err);
        }
        resolve(hash);
        });
    });
}

export const handlePasswordCompare = (passwordPlainText, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordPlainText, passwordHash, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      resolve(isMatch);
    });
  });
};