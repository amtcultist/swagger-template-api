import { FilterQuery, PaginateOptions } from 'mongoose';
import { Request, Response } from 'express';
import { checkBooleanFromString, commonErrorLog } from '@/utils';
import {
  createUser,
  deleteUserById,
  findAll,
  findUserByEmail,
  findUserById,
  findUserByUsername,
  isEmailExisted,
  isUsernameExisted,
  updateUserById,
} from './service';
import {
  generalArrayPaginateRegex,
  generalPaginateRegex,
  stringOrArrayMap,
} from '@/utils/paginate';

import { UserDocument } from './document';
import { createAccessTokenFromUser } from '@/session/service';
import { findGenderById } from '@/gender/service';
import { omit } from 'lodash';
import { parseDateStringCommon } from '@/utils/date';
import { validateEmail } from '@/utils/validate';

/**
 * A handler for createUser
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function createUserHandler(
  req: Request,
  res: Response
): Promise<Response> {
  // Check user email status
  const emailExisted = await isEmailExisted(req.body.email);

  if (emailExisted) {
    return res.status(401).send({
      message: 'Email is already taken',
    });
  }

  // Check username status
  const usernameExisted = await isUsernameExisted(req.body.username);

  if (usernameExisted) {
    return res.status(401).send({
      message: 'Username is already taken',
    });
  }

  // Check gender valid
  const isGenderValid = await findGenderById(req.body.gender);

  if (!isGenderValid) {
    return res.status(500).send({
      message: `Invalid gender ${req.body.gender}`,
    });
  }

  // Create user
  try {
    req.body.dateOfBirth = parseDateStringCommon(req.body.dateOfBirth);
    const user = await createUser(req.body);
    return res.status(200).send({
      data: omit(user.toJSON(), 'password'),
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for findAllUser
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function findAllHandler(
  req: Request,
  res: Response
): Promise<Response> {
  // Build query
  const query: FilterQuery<UserDocument> = {
    username: generalPaginateRegex(req.query.username),
    email: generalPaginateRegex(req.query.email),
    name: generalPaginateRegex(req.query.name),
    phone: generalPaginateRegex(req.query.phone),
    gender: generalArrayPaginateRegex(stringOrArrayMap(req.query.gender)),
  };

  // Build options
  const options: PaginateOptions = {
    sort: req.query.sortBy ? req.query.sortBy : {},
    page: req.query.page ? +req.query.page : 1,
    limit: req.query.limit ? +req.query.limit : 10,
    pagination: req.query.pagination
      ? checkBooleanFromString(req.query.pagination)
      : true,
    populate: 'gender',
    select: 'username email name phone gender dateOfBirth',
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
 * A handler for login
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function loginHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const loginName = req.body.username;
  let user: UserDocument;

  if (validateEmail(loginName)) {
    user = await findUserByEmail(loginName);
    if (!user)
      return res.status(404).send({
        message: `Wrong email`,
      });
  } else {
    user = await findUserByUsername(loginName);
    if (!user)
      return res.status(404).send({
        message: `Wrong username`,
      });
  }

  try {
    const isPasswordAccepted = await user.comparePassword(req.body.password);
    if (isPasswordAccepted) {
      // Build token
      const token = createAccessTokenFromUser(user);

      // Return
      return res.status(200).send({
        message: `Logged in`,
        data: omit(user, 'password'),
        token,
      });
    } else {
      return res.status(401).send({
        message: `Wrong password`,
      });
    }
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

export async function findUserByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    // Exec query, pop user into const
    const user = await findUserById(req.params.userId);

    // User not existed
    if (!user) {
      return res.status(404).send({
        message: `User not found with id = ${req.params.userId}`,
      });
    }

    // If existed
    return res.status(200).send({
      data: omit(user.toJSON(), 'password'),
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for deleteUserById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function deleteUserByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    // Exec query, pop user into const
    const user = await deleteUserById(req.params.userId);

    // User not existed
    if (!user) {
      return res.status(404).send({
        message: `User not found with id = ${req.params.userId}`,
      });
    }

    // If existed
    return res.status(200).send({
      data: omit(user.toJSON(), 'password'),
      message: `User id = ${req.params.userId} deleted successfully`,
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}

/**
 * A handler for updateUserById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export async function updateUserByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  // Verify gender
  if (req.body.gender) {
    const isGenderValid = await findGenderById(req.body.gender);

    if (!isGenderValid) {
      return res.status(500).send({
        message: `Invalid gender ${req.body.gender}`,
      });
    }
  }

  try {
    // Exec query, pop user into const
    const user = await updateUserById(req.params.userId, req.body);

    // User not existed
    if (!user) {
      return res.status(404).send({
        message: `User not found with id = ${req.params.userId}`,
      });
    }

    // If existed
    return res.status(200).send({
      data: omit(user.toJSON(), 'password'),
      message: `User id = ${req.params.userId} updated successfully`,
    });
  } catch (err) {
    return commonErrorLog(res, err);
  }
}
