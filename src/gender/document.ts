import * as mongoose from 'mongoose';

/**
 * Gender model
 * @typedef {object} Gender
 * @property {string} name.required - Gender's name
 */
export interface GenderDocument extends mongoose.Document {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
