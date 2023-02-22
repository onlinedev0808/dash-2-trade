import getConfig from "next/config";
import { Db, MongoClient } from "mongodb";

export default class Dao {
  public static instance: Dao;

  private static client: MongoClient;

  public static db: Db;

  // private constructor() {
  // }

  public static async getDbInstance(): Promise<Db> {
    if (!Dao.instance) {
      Dao.instance = new Dao();
      await Dao.init();
    }
    return Dao.db;
  }

  // if (!Dao.db) {
  //   await Dao.init();
  //   console.log("create one");
  // }
  // console.log("use one");
  // return Dao.db;

  // public static async closeConnection() {
  //   console.log("close one");
  //   Dao.client.close();
  // }

  private static async init() {
    const { serverRuntimeConfig } = getConfig();

    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxIdleTimeMS: 10000,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 20000,
    };

    Dao.client = await MongoClient.connect(
      serverRuntimeConfig.mongoDb.connectionString,
      opts
    );
    Dao.db = Dao.client.db(serverRuntimeConfig.mongoDb.dbName);
  }
}
