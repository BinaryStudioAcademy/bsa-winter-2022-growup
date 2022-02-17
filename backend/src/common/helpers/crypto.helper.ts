import crypto from 'crypto';
import { env } from '../../config/env';

const ENCRYPTION_ALG = 'aes-256-cbc';
const ENCRYPTION_KEY = env.app.secretKey;
const IV_LENGTH = 16;
const ENCODING = 'hex';

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    ENCRYPTION_ALG,
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return iv.toString(ENCODING) + ':' + encrypted.toString(ENCODING);
};

export const decrypt = (text: string): string => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), ENCODING);
  const encryptedText = Buffer.from(textParts.join(':'), ENCODING);
  const decipher = crypto.createDecipheriv(
    ENCRYPTION_ALG,
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );

  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decrypted.toString();
};
