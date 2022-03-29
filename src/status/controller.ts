import { FilterQuery, PaginateOptions } from 'mongoose';
import { Request, Response } from 'express';
import { checkBooleanFromString, commonErrorLog } from '@/utils';
import {
  createStatus,
  deleteStatusById,
  findAll,
  findStatusById,
  findStatusByName,
  isStatusNameExisted,
  updateStatusById,
} from './service';

import { StatusDocument } from './document';
import { generalPaginateRegex } from '@/utils/paginate';

/**
 * A handler for createStatus
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function createStatusHandler(
  req: Request,
  res: Response
): Promise<Response> {
  // Check if status existed
  const isExisted = await isStatusNameExisted(req.body.name);

  // Return if existed
  if (isExisted) {
    return res.status(409).send({
      message: 'Another status with same name existed',
    });
  }

  // Create status
  try {
    const status = await createStatus(req.body);
    return res.status(200).send({
      data: status.toJSON(),
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for findStatusById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function findStatusByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    // Get status from db
    const status = await findStatusById(req.params.statusId);

    // Not existed case
    if (!status) {
      return res.status(404).send({
        message: `Status not found with id = ${req.params.statusId}`,
      });
    } else {
      // Else return status
      return res.status(200).send({
        data: status.toJSON(),
      });
    }
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for findAll
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function findAllHandler(
  req: Request,
  res: Response
): Promise<Response> {
  // Build query
  const query: FilterQuery<StatusDocument> = {
    name: generalPaginateRegex(req.query.name),
  };

  // Build options
  const options: PaginateOptions = {
    sort: req.query.sortBy ? req.query.sortBy : {},
    page: req.query.page ? +req.query.page : 1,
    limit: req.query.limit ? +req.query.limit : 10,
    pagination: req.query.pagination
      ? checkBooleanFromString(req.query.pagination)
      : true,
  };

  try {
    // Get paginate result
    const result = await findAll(query, options);

    if (result) {
      return res.status(200).send({
        data: result,
        query,
        options,
      });
    }
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for deleteStatusById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function deleteStatusByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    // Exec query, pop status into const
    const status = await deleteStatusById(req.params.statusId);

    // Status not existed
    if (!status) {
      return res.status(404).send({
        message: `Status not found`,
      });
    }

    // If existed
    return res.status(200).send({
      data: status,
      message: `Status deleted successfully`,
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for updateStatusById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function updateStatusByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    // Check existed
    const checkExist = await findStatusByName(req.body.name);

    // Another status with same name existed
    if (checkExist && checkExist._id.toString() !== req.params.statusId) {
      return res.status(409).send({
        message: `Another status with same name existed`,
      });
    }

    // Exec query, pop status into const
    const status = await updateStatusById(req.params.statusId, req.body);

    // Status not existed
    if (!status) {
      return res.status(404).send({
        message: `Status not found`,
      });
    }

    // If existed
    return res.status(200).send({
      data: status,
      message: `Status updated successfully`,
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * Handler for validate status by name
 * @param {Request} req
 * @param {Response} res
 * @returns Promise<Response>
 */
export async function validateStatusNameHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const checkExist = await isStatusNameExisted(req.params.statusName);
    return res.status(200).send({
      data: !checkExist,
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}
