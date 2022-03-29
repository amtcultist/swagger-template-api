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
import { RequestValidator } from '@/middleware/requestValidator';
import { checkValidTokenMiddlewareHandler } from '@/session/controller';

export default function (app: Express) {
  const validatorInstance = Container.get(RequestValidator);

  /**
   * POST /status
   * @param {Status} request.body.required - song info
   * @return {Status} 200 - status response
   */
  app
    .route('/status')
    .post(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(createStatusSchema),
      createStatusHandler
    )
    .get(checkValidTokenMiddlewareHandler, findAllHandler);

  app
    .route('/status/:statusId')
    .get(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(findStatusByIdSchema),
      findStatusByIdHandler
    )
    .delete(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(findStatusByIdSchema),
      deleteStatusByIdHandler
    )
    .put(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(updateStatusByIdSchema),
      updateStatusByIdHandler
    );

  app.get(
    '/status/validate/name/:genderName',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findStatusByNameSchema),
    validateStatusNameHandler
  );
}
