import { NextFunction, Request, Response } from 'express';

import { SessionDocument } from './document';
import { commonErrorLog } from '@/utils';
import { findUserById } from '@/user/service';
import { verify } from 'jsonwebtoken';

/**
 * Verify token validity and respond or act as middleware
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 */
export async function checkValidTokenMiddlewareHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  const token = req.headers[process.env.TOKEN_HEADER];

  /* Sanitizing */
  if (!token) {
    return res.status(400).send({
      message: 'No authentication found',
    });
  }

  try {
    /*  Verify token */
    verify(token.toString(), process.env.TOKEN_SECRET);

    /* Middleware next step */
    next();
  } catch (err) {
    return sessionErrorHandler(res, err);
  }
}

/**
 * Decode token and response handler
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 */
export async function decodeTokenHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  const token = req.body.token.splice('Bearer '.length);

  // Sanitizing
  if (!token) {
    return res.status(400).send({
      message: 'No authentication found',
    });
  }

  try {
    // Get decoded data
    const decoded: SessionDocument = verify(
      token.toString(),
      process.env.TOKEN_SECRET
    ) as SessionDocument;

    // Get user from data
    const user = await findUserById(decoded._id);

    if (!user) {
      return res.status(404).send({
        message: 'User not found with provided token',
      });
    }

    return res.status(200).send({
      data: user,
    });
  } catch (err) {
    return sessionErrorHandler(res, err);
  }
}

/**
 * Common error handler for Session
 * @param {Response} res
 * @param {any} err
 * @returns {Promise<Response>}
 */
export async function sessionErrorHandler(
  res: Response,
  err: any
): Promise<Response> {
  // Token expired
  if (err.expiredAt) {
    return res.send({
      name: err.name,
      message: err.message,
      expiredAt: err.expiredAt,
      code: 50014,
    });
  }

  // Unindentified error
  return commonErrorLog(res, err);
}
