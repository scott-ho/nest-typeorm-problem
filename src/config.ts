import * as crypto from 'crypto';

export const SECRET = crypto.randomBytes(64).toString('hex');
