import { Express } from 'express';
import { Options } from 'express-jsdoc-swagger';

// tslint:disable-next-line: no-var-requires
const expressJSDocSwagger = require('express-jsdoc-swagger');
export function setupSwagger(app: Express) {
  const options: Options = {
    info: {
      version: '6.9.420',
      title: 'ToDoListAPI',
      license: {
        name: 'MÍT(SẤY)',
      },
      description: 'A random API to handle a random todolist frontend',
      contact: {
        name: 'something-random',
        url: 'stackoverflow.com',
        email: 'something-random@gmail.com',
      },
    },
    security: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    baseDir: __dirname,
    filesPattern: ['../**/routes.ts', '../**/document.ts'],
    swaggerUIPath: '/docs',
    exposeSwaggerUI: true,
    exposeApiDocs: true,
    apiDocsPath: '/v3/docs',
    notRequiredAsNullable: true,
    swaggerUiOptions: {
      swagger: '2.2.1',
      openapi: '3.0.5',
    },
  };
  expressJSDocSwagger(app)(options);
}
