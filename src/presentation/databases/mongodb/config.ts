import mongoose from "mongoose";

type Options = {
  mongodbUrl: string;
  databaseName: string;
};

// INFO: Allowed ignore
/* eslint no-console: ["error", { allow: ["info", "error"] }] */
export class MongodbDatabase {
  static async connect(options: Options) {
    const { databaseName, mongodbUrl } = options;

    try {
      await mongoose.connect(mongodbUrl, { dbName: databaseName });
      console.info("MongoDB database connected!");
    } catch (error) {
      console.error("MongoDB connection error!");
      throw error;
    }
  }
}
