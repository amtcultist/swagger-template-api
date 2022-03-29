import { UserDocument } from '@/user/document';
import { sign } from 'jsonwebtoken';

/**
 * Create a jwt token from current data
 * @param {any} data - data to encoded
 * @returns {string} JWT signed token
 */
export function createTokenFromData(data: any): string {
  return `Bearer ${sign(data, process.env.TOKEN_SECRET, {
    expiresIn: '1800s',
  })}`;
}

/**
 * Create token from user
 * @param {UserDocument} user - User data to sign
 * @returns {string} Token signed with user data
 */
export function createAccessTokenFromUser(user: UserDocument) {
  const payload = { _id: user._id };

  return this.createTokenFromData(payload);
}
