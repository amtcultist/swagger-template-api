import {
  DocumentDefinition,
  FilterQuery,
  PaginateOptions,
  PaginateResult,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';

import User from './model';
import { UserDocument } from './document';

/**
 * Check user is not existed, then create one
 * @param {DocumentDefinition<UserDocument>} user - inputted user
 * @returns {Promise<UserDocument>}
 */
export async function createUser(
  user: DocumentDefinition<UserDocument>
): Promise<UserDocument> {
  try {
    return await User.create(user);
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Find gender with provided query
 * @param {FilterQuery<UserDocument>} query - Query to search
 * @returns {Promise<UserDocument>} Result of find with query and populated
 */
export async function findUserByQuery(
  query: FilterQuery<UserDocument>
): Promise<UserDocument> {
  return User.findOne(query).populate('gender');
}

/**
 * Check if username is taken
 * @param {string} username - Username to check
 * @returns {Promise<boolean>} Whether user is existed
 */
export async function isUsernameExisted(username: string): Promise<boolean> {
  // Sanitizer
  if (!username) return false;

  // Get user
  const user = await findUserByQuery({ username });

  // Convert and return as boolean
  return !!user;
}

/**
 * Find user with provided username
 * @param {string} username - Username to check
 * @returns {Promise<UserDocument> | undefined} User with provided username
 */
export async function findUserByUsername(
  username: string
): Promise<UserDocument> {
  // Sanitizer
  if (!username) return;

  // Get user
  return await findUserByQuery({ username });
}

/**
 * Check if email is taken
 * @param {string} email - Email to check
 * @returns {Promise<boolean> | undefined} Whether user is existed
 */
export async function isEmailExisted(email: string): Promise<boolean> {
  // Sanitizer
  if (!email) return false;

  // Get user
  const user = await findUserByQuery({ email });

  // Convert and return as boolean
  return !!user;
}

/**
 * Find user with provided email
 * @param {string} email - Email to check
 * @returns {Promise<UserDocument> | undefined} User with provided email
 */
export async function findUserByEmail(email: string): Promise<UserDocument> {
  // Sanitizer
  if (!email) return;

  // Get user
  return await findUserByQuery({ email });
}

/**
 * Paginate user model
 * @param {FilterQuery<UserDocument>} query - FilterQuery to paginate on
 * @param {PaginateOptions} options - Paginate options
 * @returns {Promise<PaginateResult<UserDocument>>} Result of paginate
 */
export async function findAll(
  query: FilterQuery<UserDocument>,
  options: PaginateOptions
): Promise<PaginateResult<UserDocument>> {
  return User.paginate(query, options);
}

/**
 * Find a user with provided id and delete it
 * @param {string | ObjectId} id - User MongoDB ObjectId
 * @returns {Promise<UserDocument> | undefined} - Result of findByIdAndDelete
 */
export async function deleteUserById(id: string): Promise<UserDocument> {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return User.findByIdAndDelete(id).populate('gender');
}

/**
 * Find a user with provided id and return it
 * @param {string | ObjectId} id - User MongoDB ObjectId
 * @returns {Promise<UserDocument> | undefined} - Result of findById
 */
export async function findUserById(id: string): Promise<UserDocument> {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return User.findById(id).populate('gender');
}

/**
 * Update user with provided id
 * @param {string | ObjectId} id - User MongoDB ObjectId
 * @param {UpdateQuery<UserDocument>} user - inputted user
 * @returns {Promise<UserDocument> | undefined} - Result of updateUser
 */
export async function updateUserById(
  id: string,
  user: UpdateQuery<UserDocument>
) {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return User.findByIdAndUpdate(id, user, { new: true }).populate('gender');
}
