import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const key = process.env.ENCRYPTION_KEY;

if (!key || key.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be a 64-character hexadecimal string');
}



export default function encrypt(text) {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16);

    const keyBuffer = Buffer.from(key, 'hex');

    const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
}
