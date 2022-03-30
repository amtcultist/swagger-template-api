import * as mongoose from 'mongoose';

/**
 * User model
 * @typedef {object} User
 * @property {string} username.required - User's username
 * @property {string} password.required - User's password
 * @property {string} email.required - User's email
 * @property {string} name.required - User's name
 * @property {string} phone.required - User's phone
 * @property {string} dateOfBirth.required - User's dateOfBirth
 * @property {Gender} gender.required - User's gender
 */
export interface UserDocument extends mongoose.Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  phone: string;
  dateOfBirth: Date;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
