import { Express } from 'express';
import { Options } from 'express-jsdoc-swagger';

// tslint:disable-next-line: no-var-requires
const expressJSDocSwagger = require('express-jsdoc-swagger');
export function setupSwagger(app: Express) {
  const options: Options = {
    info: {
      version: '1.0.0',
      title: 'ToDoListAPI',
      license: {
        name: 'MIT',
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
      openapi: '3.0.0',
    },
  };
  expressJSDocSwagger(app)(options);
}
