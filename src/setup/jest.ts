import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { Service } from 'typedi';

@Service()
export class JestSetup {
  mongod = new MongoMemoryServer();

  /**
   * Connect to mock memory db.
   */
  public async connectMock() {
    const uri = await this.mongod.getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      poolSize: 10,
    };

    await mongoose.connect(uri, mongooseOpts);
  }

  /**
   * Close db connection
   */
  public async closeMock() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongod.stop();
  }

  /**
   * Delete db collections
   */
  public async clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      if (collections.hasOwnProperty(key)) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    }
  }
}
