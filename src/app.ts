import 'reflect-metadata';

import * as dotenv from 'dotenv';
import * as express from 'express';

import Container from 'typedi';
import { Middleware } from './setup/middleware';
import { MongooseSetup } from './setup/mongoose';
import routes from './routes';
import { setupSwagger } from './setup/swagger';

// Setup dotenv
dotenv.config();

// Setup express
const app = express();

// Setup middleware
Container.get(Middleware).initMiddleware(app);

// Get host and port
const port: number = +process.env.PORT ?? 3000;
const host: string = process.env.HOST ?? 'localhost';

// Listen server
app.listen(port, host, () => {
  console.log(`⚡Server is running on ${host}:${port}`);

  // Connecting to the database
  Container.get(MongooseSetup).initMongoose();

  // Setup routes
  routes(app);
});

// Default page
app.get('/', function (req, res) {
  res.send(`⚡Server is running on ${host}:${port}`);
});

setupSwagger(app);
