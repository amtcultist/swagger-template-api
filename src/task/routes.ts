import {
  createTaskHandler,
  deleteTaskByIdHandler,
  findAllHandler,
  findTaskByIdHandler,
  updateTaskByIdHandler,
} from './controller';
import {
  createTaskSchema,
  findTaskByIdSchema,
  updateTaskSchema,
} from './schema';

import Container from 'typedi';
import { Express } from 'express';
import { RequestValidator } from '@/middleware/requestValidator';
import { checkValidTokenMiddlewareHandler } from '@/session/controller';

export default function (app: Express) {
  const validatorInstance = Container.get(RequestValidator);

  /**
   * POST /task
   * @security BearerAuth
   * @summary Create a new task
   * @param {Task} request.body.required - Inputted task
   * @tags Task Routes
   */
  app.post(
    '/task',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(createTaskSchema),
    createTaskHandler
  );

  /**
   * GET /task
   * @security BearerAuth
   * @summary Query for list of Task
   * @param {string} title.query - Title to filter
   * @param {Array<string>} status.query - Statuses to filter
   * @param {Array<string>} assignee.query - Assignees to filter
   * @param {string} content.query - Content to filter
   * @param {string} sortBy.query - Pagination sort by
   * @param {number} page.query - default: 1 - Pagination page number
   * @param {number} limit.query - default: 10 - Pagination page size
   * @param {boolean} pagination.query - default: true - Use pagination
   * @tags Task Routes
   */
  app.get('/task', checkValidTokenMiddlewareHandler, findAllHandler);

  /**
   * GET /task/{taskId}
   * @security BearerAuth
   * @summary Get detail of a task by id
   * @param {string} taskId.path - Task's id
   * @tags Task Routes
   */
  app.get(
    '/task/:taskId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findTaskByIdSchema),
    findTaskByIdHandler
  );

  /**
   * DELETE /task/{taskId}
   * @security BearerAuth
   * @summary Delete a task by id
   * @param {string} taskId.path - Task's id
   * @tags Task Routes
   */
  app.delete(
    '/task/:taskId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findTaskByIdSchema),
    deleteTaskByIdHandler
  );

  /**
   * PUT /task/{taskId}
   * @security BearerAuth
   * @summary Update a task by id
   * @param {string} taskId.path - Task's id
   * @param {Task} request.body.required - Inputted task
   * @tags Task Routes
   */
  app.put(
    '/task/:taskId',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(updateTaskSchema),
    updateTaskByIdHandler
  );
}
