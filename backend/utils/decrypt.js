import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const key = process.env.ENCRYPTION_KEY;

export default function decrypt(encryptedText, iv) {
    const algorithm = 'aes-256-cbc';
    const ivBuffer = Buffer.from(iv, 'hex');
    const keyBuffer = Buffer.from(key, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted; // Return the decrypted password
}
