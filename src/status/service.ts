import {
  DocumentDefinition,
  FilterQuery,
  PaginateOptions,
  PaginateResult,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';

import Status from './model';
import { StatusDocument } from './document';

/**
 * Create a status with inputted data
 * @param {DocumentDefinition<StatusDocument>} status - Status info
 * @returns {Promise<StatusDocument>} Result of create new status
 */
export async function createStatus(
  status: DocumentDefinition<StatusDocument>
): Promise<StatusDocument> {
  try {
    return await Status.create(status);
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Find a status with provided query
 * @param {FilterQuery<StatusDocument>} query - Query to search
 * @returns {Promise<StatusDocument>} Result of findOne(query)
 */
export async function findStatusByQuery(
  query: FilterQuery<StatusDocument>
): Promise<StatusDocument> {
  return Status.findOne(query).lean();
}

/**
 * Find a status with provided id
 * @param {string | ObjectId} id - Status MongoDB ObjectId
 * @returns {Promise<StatusDocument> | undefined} result of findById
 */
export async function findStatusById(id: string): Promise<StatusDocument> {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return Status.findById(id);
}

/**
 * @param {FilterQuery<StatusDocument>} query - MongoDB query
 * @param {PaginateOptions} options - mongoose-paginate-v2 options
 * @returns {Promise<PaginateResult<StatusDocument>>} result of paginate
 */
export async function findAll(
  query: FilterQuery<StatusDocument>,
  options: PaginateOptions
): Promise<PaginateResult<StatusDocument>> {
  return Status.paginate(query, options);
}

/**
 * Check status is existed by name
 * @param {string | ObjectId} name
 * @returns {Promise<boolean>} result wheter status is existed
 */
export async function isStatusNameExisted(name: string): Promise<boolean> {
  // Sanitizer
  if (!name) return false;

  // Get Status
  const status = await findStatusByQuery({ name });

  // Convert and return as boolean
  return !!status;
}

/**
 * Find status by provided name
 * @param {string | ObjectId} name
 * @returns {Promise<statusDocument> | undefined} result of status
 */
export async function findStatusByName(name: string): Promise<StatusDocument> {
  // Sanitizer
  if (!name) return;

  return findStatusByQuery({ name });
}

/**
 * Delete a status with provided id
 * @param {string | ObjectId} id
 * @returns {Promise<StatusDocument> | undefined} Result of findByIdAndDelete
 * @description Find a status with provided id and delete it
 */
export async function deleteStatusById(id: string): Promise<StatusDocument> {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return Status.findByIdAndDelete(id);
}

/**
 * Find a status with provided id and update with provided UpdateQuery
 * @param {string | ObjectId} id - status MongoDB ObjectId
 * @param {UpdateQuery<StatusDocument>} status - fields to update
 * @returns {Promise<StatusDocument> | undefined} Result of findByIdAndUpdate
 */
export async function updateStatusById(
  id: string,
  status: UpdateQuery<StatusDocument>
): Promise<StatusDocument> {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return Status.findByIdAndUpdate(id, status, { new: true });
}
