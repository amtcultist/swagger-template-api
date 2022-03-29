import * as mongoose from 'mongoose';

/**
 * User model
 * @typedef {object} User
 * @property {string} _id - User's mongodb _id
 * @property {string} title.required - User's title
 * @property {Status} status - User's status
 * @property {string} content - User's content
 * @property {User} assignee - User's name
 * @property {string} createdAt - User's mongoDb createdAt
 * @property {string} updatedAt - User's mongoDb updatedAt
 */
export interface TaskDocument extends mongoose.Document {
  _id: string;
  title: string;
  status?: string;
  content?: string;
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
}
