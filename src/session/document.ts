import { JwtPayload } from 'jsonwebtoken';

/**
 * Session model
 * @typedef {object} Session
 * @property {string} _id - Session's user _id
 */
export interface SessionDocument extends JwtPayload {
  _id: string;
}
