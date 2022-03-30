import * as mongoose from 'mongoose';

/**
 * Status model
 * @typedef {object} Status
 * @property {string} name.required - Status's name
 */
export interface StatusDocument extends mongoose.Document {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
