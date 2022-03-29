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

  app
    .route('/user')
    .post(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(createUserSchema),
      createUserHandler
    )
    .get(checkValidTokenMiddlewareHandler, findAllHandler);

  app
    .route('/user/:userId')
    .get(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(findUserByIdSchema),
      findUserByIdHandler
    )
    .delete(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(findUserByIdSchema),
      deleteUserByIdHandler
    )
    .put(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(updateUserSchema),
      updateUserByIdHandler
    );

  app.post('/login', validatorInstance.validate(loginSchema), loginHandler);
}
