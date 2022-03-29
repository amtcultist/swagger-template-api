import Container from 'typedi';
import { Express } from 'express';
import { RequestValidator } from '@/middleware/requestValidator';
import { decodeTokenHandler } from './controller';
import { tokenDecoderSchema } from './schema';

export default function (app: Express) {
  const validatorInstance = Container.get(RequestValidator);

  app.post(
    '/session',
    validatorInstance.validate(tokenDecoderSchema),
    decodeTokenHandler
  );
}
