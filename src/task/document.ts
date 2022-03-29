import * as mongoose from 'mongoose';

/**
 * Task model
 * @typedef {object} Task
 * @property {string} _id - Task's mongodb _id
 * @property {string} title.required - Task's title
 * @property {Status} status - Task's status - status _id
 * @property {string} content - Task's content
 * @property {User} assignee - Task's assignee - user _id
 * @property {string} createdAt - Task's mongoDb createdAt
 * @property {string} updatedAt - Task's mongoDb updatedAt
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
