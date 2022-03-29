import { FilterQuery, PaginateOptions } from 'mongoose';
import { Request, Response } from 'express';
import { checkBooleanFromString, commonErrorLog } from '@/utils';
import {
  createTask,
  deleteTaskById,
  findAll,
  findTaskById,
  updateTaskById,
} from './service';
import {
  generalArrayPaginateRegex,
  generalPaginateRegex,
  stringOrArrayMap,
} from '@/utils/paginate';

import { TaskDocument } from './document';
import { findStatusById } from '@/status/service';
import { findUserById } from '@/user/service';

/**
 * A handler for createTask
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function createTaskHandler(
  req: Request,
  res: Response
): Promise<Response> {
  // Check assignee valid
  if (req.body.assignee) {
    const isAssigneeValid = await findUserById(req.body.assignee);

    if (!isAssigneeValid) {
      return res.status(500).send({
        message: `Invalid assignee ${req.body.assignee}`,
      });
    }
  }

  // Check status valid
  if (req.body.status) {
    const isStatusValid = await findStatusById(req.body.status);

    if (!isStatusValid) {
      return res.status(500).send({
        message: `Invalid status ${req.body.status}`,
      });
    }
  }

  // Create task
  try {
    const status = await createTask(req.body);
    return res.status(200).send({
      data: status.toJSON(),
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for findAllTask
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function findAllHandler(
  req: Request,
  res: Response
): Promise<Response> {
  // Build query
  const query: FilterQuery<TaskDocument> = {
    title: generalPaginateRegex(req.body.title),
    status: generalArrayPaginateRegex(stringOrArrayMap(req.body.status)),
    assignee: generalArrayPaginateRegex(stringOrArrayMap(req.body.assignee)),
    content: generalPaginateRegex(req.body.content),
  };

  // Build options
  const options: PaginateOptions = {
    sort: req.query.sortBy ? req.query.sortBy : {},
    page: req.query.page ? +req.query.page : 1,
    limit: req.query.limit ? +req.query.limit : 10,
    pagination: req.query.pagination
      ? checkBooleanFromString(req.query.pagination)
      : true,
    populate: 'assignee status',
  };

  try {
    // Get paginate result
    const result = await findAll(query, options);

    if (result) {
      return res.status(200).send({
        data: result,
        code: 200,
        query,
        options,
      });
    }
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for findTaskById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function findTaskByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    // Exec query, pop task into const
    const task = await findTaskById(req.params.taskId);

    // Task not existed
    if (!task) {
      return res.status(404).send({
        message: `Task not found with id = ${req.params.taskId}`,
      });
    }

    // If existed
    return res.status(200).send({
      data: task.toJSON(),
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for deleteTaskById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function deleteTaskByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    // Exec query, pop task into const
    const task = await deleteTaskById(req.params.taskId);

    // Task not existed
    if (!task) {
      return res.status(404).send({
        message: `Task not found with id = ${req.params.taskId}`,
      });
    }

    // If existed
    return res.status(200).send({
      data: task.toJSON(),
      message: `Task id = ${req.params.taskId} deleted successfully`,
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for updateTaskById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function updateTaskByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  // Check assignee valid
  if (req.body.assignee) {
    const isAssigneeValid = await findUserById(req.body.assignee);

    if (!isAssigneeValid) {
      return res.status(500).send({
        message: `Invalid assignee ${req.body.assignee}`,
      });
    }
  }

  // Check status valid
  if (req.body.status) {
    const isStatusValid = await findStatusById(req.body.status);

    if (!isStatusValid) {
      return res.status(500).send({
        message: `Invalid status ${req.body.status}`,
      });
    }
  }

  try {
    // Exec query, pop task into const
    const task = await updateTaskById(req.params.taskId, req.body);

    // Task not existed
    if (!task) {
      return res.status(404).send({
        message: `Task not found with id = ${req.params.taskId}`,
      });
    }

    // If existed
    return res.status(200).send({
      data: task.toJSON(),
      message: `Task id = ${req.params.taskId} updated successfully`,
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}
