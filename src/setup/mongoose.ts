import * as mongoose from 'mongoose';

import { Service } from 'typedi';

@Service()
export class MongooseSetup {
  /**
   * Connect to MongoDB
   */
  public initMongoose() {
    // Get config
    // You may as why require here
    // Cause require in typescript suck, so we polyfill node require here
    // And require to avoid no dotenv
    const url = require('@/config/database').default;

    /* Get dbUri from config */
    const dbUri = url;

    // mongoose.Promise = global.Promise // Doesn't work anymore

    // Mongoose connector
    mongoose
      .connect(dbUri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Successfully connected to the database');
      })
      .catch((err) => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit(1);
      });
  }
}
