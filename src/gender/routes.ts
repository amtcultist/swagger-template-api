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

  app
    .route('/gender')
    .post(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(createGenderSchema),
      createGenderHandler
    )
    .get(checkValidTokenMiddlewareHandler, findAllHandler);

  app
    .route('/gender/:genderId')
    .get(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(findGenderByIdSchema),
      findGenderByIdHandler
    )
    .delete(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(findGenderByIdSchema),
      deleteGenderByIdHandler
    )
    .put(
      checkValidTokenMiddlewareHandler,
      validatorInstance.validate(updateGenderByIdSchema),
      updateGenderByIdHandler
    );

  app.get(
    '/gender/validate/name/:genderName',
    checkValidTokenMiddlewareHandler,
    validatorInstance.validate(findGenderByNameSchema),
    validateGenderNameHandler
  );
}
