import * as mongoose from 'mongoose';

/**
 * Gender model
 * @typedef {object} Gender
 * @property {string} _id - Gender's mongodb _id
 * @property {string} name.required - Gender's name
 * @property {date-time} createdAt - Gender's mongoDb createdAt
 * @property {date-time} updatedAt - Gender's mongoDb updatedAt
 */
export interface GenderDocument extends mongoose.Document {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
