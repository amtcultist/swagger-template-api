import * as cors from 'cors';

import { Express, json, urlencoded } from 'express';

import { Service } from 'typedi';

@Service()
export class Middleware {
  /**
   * Whole function for setup purpose
   * @param {Express} app
   */
  public initMiddleware(app: Express) {
    this.initUrlEncoded(app);
    this.initJson(app);
    this.initCors(app);
  }

  /**
   * Initialised url encoded middleware for express
   * @param {Express} app
   */
  private initUrlEncoded(app: Express) {
    // Sanitizer
    if (!app) return;

    // Parse requests of content-type - application/x-www-form-urlencoded
    app.use(
      urlencoded({
        extended: true,
      })
    );
  }

  /**
   * Initialised json middleware for express
   * @param {Express} app
   */
  private initJson(app: Express) {
    // Sanitizer
    if (!app) return;

    // Parse requests of content-type - application/json
    app.use(json());
  }

  /**
   * Initialised cors middleware for express
   * @param {Express} app
   */
  private initCors(app: Express) {
    // Sanitizer
    if (!app) return;

    // Parse requests of content-type - application/json
    app.use(cors());
  }
}
