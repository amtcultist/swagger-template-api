import Container from 'typedi';
import { Express } from 'express';
import { RequestValidator } from '@/middleware/requestValidator';
import { decodeTokenHandler } from './controller';
import { tokenDecoderSchema } from './schema';

export default function (app: Express) {
  const validatorInstance = Container.get(RequestValidator);

  /**
   * Token
   * @typedef {object} TokenObject
   * @property {string} token.required - token
   */

  /**
   * POST /session
   * @summary Validate a token
   * @param {TokenObject} request.body.required - Gender's id
   * @tags Session Routes
   */
  app.post(
    '/session',
    validatorInstance.validate(tokenDecoderSchema),
    decodeTokenHandler
  );
}
