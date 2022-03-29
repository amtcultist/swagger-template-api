import * as mongoose from 'mongoose';

/**
 * Status model
 * @typedef {object} Status
 * @property {string} _id - Status's mongodb _id
 * @property {string} name.required - Status's name
 * @property {string} createdAt - Status's createdAt
 * @property {string} updatedAt - Status's updatedAt
 */
export interface StatusDocument extends mongoose.Document {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
