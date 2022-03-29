import {
  DocumentDefinition,
  FilterQuery,
  PaginateOptions,
  PaginateResult,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';

import Gender from './model';
import { GenderDocument } from './document';

/**
 * Create a gender with inputted data
 * @param {DocumentDefinition<GenderDocument>} gender - Gender info
 * @returns {Promise<GenderDocument>} Result of create new gender
 */
export async function createGender(
  gender: DocumentDefinition<GenderDocument>
): Promise<GenderDocument> {
  try {
    return await Gender.create(gender);
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Find gender with provided query
 * @param {FilterQuery<GenderDocument>} query - Query to search
 * @returns {Promise<GenderDocument>} Result of findOne(query)
 */
export async function findGenderByQuery(
  query: FilterQuery<GenderDocument>
): Promise<GenderDocument> {
  return Gender.findOne(query).lean();
}

/**
 * Find a gender with provided id
 * @param {string | ObjectId} id - Gender MongoDB ObjectId
 * @returns {Promise<GenderDocument> | undefined} result of findById
 */
export async function findGenderById(id: string): Promise<GenderDocument> {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return Gender.findById(id);
}

/**
 * @param {FilterQuery<GenderDocument>} query - MongoDB query
 * @param {PaginateOptions} options - mongoose-paginate-v2 options
 * @returns {Promise<PaginateResult<GenderDocument>>} result of paginate
 */
export async function findAll(
  query: FilterQuery<GenderDocument>,
  options: PaginateOptions
): Promise<PaginateResult<GenderDocument>> {
  return Gender.paginate(query, options);
}

/**
 * Check gender is existed by name
 * @param {string | ObjectId} name
 * @returns {Promise<boolean>} result of gender is existed
 */
export async function isGenderNameExisted(name: string): Promise<boolean> {
  // Sanitizer
  if (!name) return false;

  // Get gender
  const gender = await findGenderByQuery({ name });

  // Convert and return as boolean
  return !!gender;
}

/**
 * Find gender by provided name
 * @param {string | ObjectId} name
 * @returns {Promise<GenderDocument> | undefined} result of gender
 */
export async function findGenderByName(name: string): Promise<GenderDocument> {
  // Sanitizer
  if (!name) return;

  return findGenderByQuery({ name });
}

/**
 * Delete a gender with provided id
 * @param {string | ObjectId} id
 * @returns {Promise<GenderDocument> | undefined} Result of findByIdAndDelete
 * @description Find a gender with provided id and delete it
 */
export async function deleteGenderById(id: string): Promise<GenderDocument> {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return Gender.findByIdAndDelete(id);
}

/**
 * Find a gender with provided id and update with provided UpdateQuery
 * @param {string | ObjectId} id - Gender MongoDB ObjectId
 * @param {UpdateQuery<GenderDocument>} gender - fields to update
 * @returns {Promise<GenderDocument> | undefined} Result of findByIdAndUpdate
 */
export async function updateGenderById(
  id: string,
  gender: UpdateQuery<GenderDocument>
): Promise<GenderDocument> {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return Gender.findByIdAndUpdate(id, gender, { new: true });
}
