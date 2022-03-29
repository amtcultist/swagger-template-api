import {
  DocumentDefinition,
  FilterQuery,
  PaginateOptions,
  PaginateResult,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';

import Task from './model';
import { TaskDocument } from './document';

/**
 * Create a task with inputted data
 * @param {DocumentDefinition<TaskDocument>} task - Task info
 * @returns {Promise<TaskDocument>} Result of create new task
 */
export async function createTask(
  task: DocumentDefinition<TaskDocument>
): Promise<TaskDocument> {
  try {
    return await Task.create(task);
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Find a task with provided query
 * @param {FilterQuery<TaskDocument>} query - Query to search
 * @returns {Promise<TaskDocument>} Result of findOne(query)
 */
export async function findTaskByQuery(
  query: FilterQuery<TaskDocument>
): Promise<TaskDocument> {
  return Task.findOne(query).lean();
}

/**
 * Find a task with provided id
 * @param {string | ObjectId} id - Task MongoDB ObjectId
 * @returns {Promise<TaskDocument> | undefined} result of findById
 */
export async function findTaskById(id: string): Promise<TaskDocument> {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return Task.findById(id);
}

/**
 * @param {FilterQuery<TaskDocument>} query - MongoDB query
 * @param {PaginateOptions} options - mongoose-paginate-v2 options
 * @returns {Promise<PaginateResult<TaskDocument>>} result of paginate
 */
export async function findAll(
  query: FilterQuery<TaskDocument>,
  options: PaginateOptions
): Promise<PaginateResult<TaskDocument>> {
  return Task.paginate(query, options);
}

/**
 * Delete a task with provided id
 * @param {string | ObjectId} id
 * @returns {Promise<TaskDocument> | undefined} Result of findByIdAndDelete
 * @description Find a task with provided id and delete it
 */
export async function deleteTaskById(id: string): Promise<TaskDocument> {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return Task.findByIdAndDelete(id);
}

/**
 * Find a task with provided id and update with provided UpdateQuery
 * @param {string | ObjectId} id - Task MongoDB ObjectId
 * @param {UpdateQuery<TaskDocument>} task - fields to update
 * @returns {Promise<TaskDocument> | undefined} Result of findByIdAndUpdate
 */
export async function updateTaskById(
  id: string,
  task: UpdateQuery<TaskDocument>
): Promise<TaskDocument> {
  // Sanitizing
  if (!id || !isValidObjectId(id)) return;

  return Task.findByIdAndUpdate(id, task, { new: true });
}
