import {
  createStatusHandler,
  deleteStatusByIdHandler,
  findAllHandler,
  findStatusByIdHandler,
  updateStatusByIdHandler,
  validateStatusNameHandler,
} from './controller';
import {
  createStatusSchema,
  findStatusByIdSchema,
  findStatusByNameSchema,
  updateStatusByIdSchema,
} from './schema';

import Container from 'typedi';
import { Express } from 'express';
import { PaginateResult } from 'mongoose';
import { RequestValidator } from '@/middleware/requestValidator';
import { StatusDocument } from './document';
import { checkValidTokenMiddlewareHandler } from '@/session/controller';

export default function (app: Express) {
  const validatorInstance = Container.get(RequestValidator);

  /**
   * POST /status
   * @security BearerAuth
   * @summary Create a new status
   * @param {Status} request.body.required - Status
   * @tags Status Routes
   */
  app.post(
    '/status',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(createStatusSchema),
    createStatusHandler
  );

  /**
   * GET /status
   * @security BearerAuth
   * @summary Query for list of status
   * @param {string} name.query - Status's name
   * @param {string} sortBy.query - Pagination sort by
   * @param {number} page.query - default: 1 - Pagination page number
   * @param {number} limit.query - default: 10 - Pagination page size
   * @param {boolean} pagination.query - default: true - Use pagination
   * @tags Status Routes
   */
  app.get('/status', checkValidTokenMiddlewareHandler, findAllHandler);

  /**
   * GET /status/{statusId}
   * @security BearerAuth
   * @summary Get detail of a status by id
   * @param {string} statusId.path - Status's id
   * @tags Status Routes
   */
  app.get(
    '/status/:statusId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findStatusByIdSchema),
    findStatusByIdHandler
  );

  /**
   * DELETE /status/{statusId}
   * @security BearerAuth
   * @summary Delete a status by id
   * @param {string} statusId.path - Status's id
   * @tags Status Routes
   */
  app.delete(
    '/status/:statusId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findStatusByIdSchema),
    deleteStatusByIdHandler
  );

  /**
   * PUT /status/{statusId}
   * @security BearerAuth
   * @summary Update a status by id
   * @param {string} statusId.path - Status's id
   * @param {Status} request.body.required - Status
   * @tags Status Routes
   */
  app.put(
    '/status/:statusId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(updateStatusByIdSchema),
    updateStatusByIdHandler
  );

  /**
   * GET /status/validate/name/{statusName}
   * @summary Validate if status name is existed or not
   * @security BearerAuth
   * @param {string} statusName.path - Gender's name
   * @tags Status Routes
   */
  app.get(
    '/status/validate/name/:statusName',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findStatusByNameSchema),
    validateStatusNameHandler
  );
}
