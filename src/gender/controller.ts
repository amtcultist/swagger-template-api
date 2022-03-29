import { FilterQuery, PaginateOptions } from 'mongoose';
import { Request, Response } from 'express';
import { checkBooleanFromString, commonErrorLog } from '@/utils';
import {
  createGender,
  deleteGenderById,
  findAll,
  findGenderById,
  findGenderByName,
  isGenderNameExisted,
  updateGenderById,
} from './service';

import { GenderDocument } from './document';
import { generalPaginateRegex } from '@/utils/paginate';

/**
 * A handler for createGender
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function createGenderHandler(
  req: Request,
  res: Response
): Promise<Response> {
  // Check gender status
  const isExisted = await isGenderNameExisted(req.body.name);

  // Return if existed
  if (isExisted) {
    return res.status(409).send({
      message: 'Another gender with same name existed',
    });
  }

  // Create gender
  try {
    const gender = await createGender(req.body);
    return res.status(200).send({
      data: gender.toJSON(),
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for findGenderById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function findGenderByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    // Get gender from db
    const gender = await findGenderById(req.params.genderId);

    // Not existed case
    if (!gender) {
      return res.status(404).send({
        message: `Gender not found with id = ${req.params.genderId}`,
      });
    } else {
      // Else return gender
      return res.status(200).send({
        data: gender.toJSON(),
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
  const query: FilterQuery<GenderDocument> = {
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
 * A handler for deleteGenderById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function deleteGenderByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    // Exec query, pop gender into const
    const gender = await deleteGenderById(req.params.genderId);

    // Gender not existed
    if (!gender) {
      return res.status(404).send({
        message: `Gender not found`,
      });
    }

    // If existed
    return res.status(200).send({
      data: gender,
      message: `Gender deleted successfully`,
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for updateGenderById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function updateGenderByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    // Check existed
    const checkExist = await findGenderByName(req.body.name);

    // Another gender with same name existed
    if (checkExist && checkExist._id.toString() !== req.params.genderId) {
      return res.status(409).send({
        message: `Another gender with same name existed`,
      });
    }

    // Exec query, pop gender into const
    const gender = await updateGenderById(req.params.genderId, req.body);

    // Gender not existed
    if (!gender) {
      return res.status(404).send({
        message: `Gender not found`,
      });
    }

    // If existed
    return res.status(200).send({
      data: gender,
      message: `Gender updated successfully`,
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * Handler for validate gender by name
 * @param {Request} req
 * @param {Response} res
 * @returns Promise<Response>
 */
export async function validateGenderNameHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const checkExist = await isGenderNameExisted(req.params.genderName);
    return res.status(200).send({
      data: !checkExist,
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}
