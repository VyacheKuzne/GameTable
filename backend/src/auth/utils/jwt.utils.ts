// auth/utils/jwt.utils.ts
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'supersecretkey123';

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    throw new Error('Invalid token');
  }
}
