import {
  createGenderHandler,
  deleteGenderByIdHandler,
  findAllHandler,
  findGenderByIdHandler,
  updateGenderByIdHandler,
  validateGenderNameHandler,
} from './controller';
import {
  createGenderSchema,
  findGenderByIdSchema,
  findGenderByNameSchema,
  updateGenderByIdSchema,
} from './schema';

import Container from 'typedi';
import { Express } from 'express';
import { RequestValidator } from '@/middleware/requestValidator';
import { checkValidTokenMiddlewareHandler } from '@/session/controller';

export default function (app: Express) {
  const validatorInstance = Container.get(RequestValidator);

  /**
   * POST /gender
   * @security BearerAuth
   * @summary Create a new gender
   * @param {Gender} request.body.required - Gender
   * @tags Gender Routes
   */
  app.post(
    '/gender',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(createGenderSchema),
    createGenderHandler
  );

  /**
   * GET /gender
   * @security BearerAuth
   * @summary Query for list of gender
   * @param {string} name.query - Gender's name
   * @param {string} sortBy.query - Pagination sort by
   * @param {number} page.query - default: 1 - Pagination page number
   * @param {number} limit.query - default: 10 - Pagination page size
   * @param {boolean} pagination.query - default: true - Use pagination
   * @tags Gender
   */
  app.get('/gender', checkValidTokenMiddlewareHandler, findAllHandler);

  /**
   * GET /gender/{genderId}
   * @security BearerAuth
   * @summary Get detail of a gender by id
   * @param {string} genderId.path - Gender's id
   * @tags Gender Routes
   */
  app.get(
    '/gender/:genderId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findGenderByIdSchema),
    findGenderByIdHandler
  );

  /**
   * DELETE /gender/{genderId}
   * @security BearerAuth
   * @summary Delete a gender by id
   * @param {string} genderId.path - Gender's id
   * @tags Gender Routes
   */
  app.delete(
    '/gender/:genderId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findGenderByIdSchema),
    deleteGenderByIdHandler
  );

  /**
   * PUT /gender/{genderId}
   * @security BearerAuth
   * @summary Update a gender by id
   * @param {string} genderId.path - Gender's id
   * @param {Gender} request.body.required - Gender
   * @tags Gender Routes
   */
  app.put(
    '/gender/:genderId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(updateGenderByIdSchema),
    updateGenderByIdHandler
  );

  /**
   * GET /gender/validate/name/{genderName}
   * @summary Validate if gender name is existed or not
   * @security BearerAuth
   * @param {string} genderName.path - Gender's name
   * @tags Gender Routes
   */
  app.get(
    '/gender/validate/name/:genderName',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findGenderByNameSchema),
    validateGenderNameHandler
  );
}
