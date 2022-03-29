import {
  createUserHandler,
  deleteUserByIdHandler,
  findAllHandler,
  findUserByIdHandler,
  loginHandler,
  updateUserByIdHandler,
} from './controller';
import {
  createUserSchema,
  findUserByIdSchema,
  loginSchema,
  updateUserSchema,
} from './schema';

import Container from 'typedi';
import { Express } from 'express';
import { RequestValidator } from '@/middleware/requestValidator';
import { checkValidTokenMiddlewareHandler } from '@/session/controller';

export default function (app: Express) {
  const validatorInstance = Container.get(RequestValidator);

  /**
   * POST /user
   * @summary Create a new user
   * @param {User} request.body.required - Inputted user
   * @tags User Routes
   */
  app.post(
    '/user',
    validatorInstance.validate(createUserSchema),
    createUserHandler
  );

  /**
   * GET /user
   * @security BearerAuth
   * @param {string} username.query - Username filter
   * @param {string} email.query - Email filter
   * @param {string} name.query - Name filter
   * @param {string} phone.query - Phone filter
   * @param {Array<string>} gender.query - Gender _id filter
   * @param {string} sortBy.query - Pagination sort by
   * @param {number} page.query - default: 1 - Pagination page number
   * @param {number} limit.query - default: 10 - Pagination page size
   * @param {boolean} pagination.query - default: true - Use pagination
   * @tags User Routes
   */
  app.get('/user', checkValidTokenMiddlewareHandler, findAllHandler);

  /**
   * GET /user/{userId}
   * @security BearerAuth
   * @summary Get detail of a user by id
   * @param {string} userId.path - User's id
   * @tags User Routes
   */
  app.get(
    '/user/:userId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findUserByIdSchema),
    findUserByIdHandler
  );

  /**
   * DELETE /user/{userId}
   * @security BearerAuth
   * @summary Delete a user by id
   * @param {string} userId.path - User's id
   * @tags User Routes
   */
  app.delete(
    '/user/:userId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findUserByIdSchema),
    deleteUserByIdHandler
  );

  /**
   * PUT /user/{userId}
   * @security BearerAuth
   * @summary Update a user by id
   * @param {string} userId.path - User's id
   * @param {User} request.body.required - Inputted user
   * @tags User Routes
   */
  app.put(
    '/user/:userId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(updateUserSchema),
    updateUserByIdHandler
  );

  /**
   * User credential
   * @typedef {object} LoginForm
   * @property {string} username - username credential
   * @property {string} password - password credential
   */

  /**
   * POST /login
   * @summary Login a user and return accessible token
   * @param {LoginForm} request.body.required - Login credential
   * @tags User Routes
   */
  app.post('/login', validatorInstance.validate(loginSchema), loginHandler);
}
