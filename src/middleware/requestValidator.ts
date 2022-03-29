import { NextFunction, Request, Response } from 'express';

import { AnySchema } from 'yup';
import { Service } from 'typedi';
import log from '@/logger';

@Service()
export class RequestValidator {
  public validate =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validate({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        return next();
      } catch (e) {
        log.error(e);
        return res.status(400).send(e.errors);
      }
    };
}
