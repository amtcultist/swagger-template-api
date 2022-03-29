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

  app
    .route('/task')
    .post(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(createTaskSchema),
      createTaskHandler
    )
    .get(checkValidTokenMiddlewareHandler, findAllHandler);

  app
    .route('/task/:taskId')
    .get(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(findTaskByIdSchema),
      findTaskByIdHandler
    )
    .delete(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(findTaskByIdSchema),
      deleteTaskByIdHandler
    )
    .put(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(updateTaskSchema),
      updateTaskByIdHandler
    );
}
