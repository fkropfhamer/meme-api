import { JWT_SECRET } from './constants';
import jwt from 'jsonwebtoken';

export function createJWT(payload: Record<string, unknown>, expiresIn = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
