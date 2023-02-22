import getConfig from "next/config";
import { MongoClient } from "mongodb";

const { serverRuntimeConfig } = getConfig();
const MONGODB_URI = serverRuntimeConfig.mongoDb.connectionString;

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const options = {};

let client;

// eslint-disable-next-line
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
    // console.log("new one");
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// import getConfig from "next/config";
// import { MongoClient } from "mongodb";

// const { serverRuntimeConfig } = getConfig();

// const MONGODB_URI = serverRuntimeConfig.mongoDb.connectionString;
// const MONGODB_DB = serverRuntimeConfig.mongoDb.dbName;

// // check the MongoDB URI
// if (!MONGODB_URI) {
//   throw new Error("Define the MONGODB_URI environmental variable");
// }

// // check the MongoDB DB
// if (!MONGODB_DB) {
//   throw new Error("Define the MONGODB_DB environmental variable");
// }

// let cachedClient = null;
// let cachedDb = null;

// export async function connectToDatabase() {
//   // check the cached.
//   if (cachedClient && cachedDb) {
//     // load from cache
//     console.log("cached");
//     return {
//       client: cachedClient,
//       db: cachedDb,
//     };
//   }
//   console.log("create");

//   // set the connection options
//   const opts = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     maxIdleTimeMS: 10000,
//     serverSelectionTimeoutMS: 10000,
//     socketTimeoutMS: 20000,
//   };

//   // Connect to cluster
//   const client = new MongoClient(MONGODB_URI, opts);
//   await client.connect();
//   const db = client.db(MONGODB_DB);

//   // set cache
//   cachedClient = client;
//   cachedDb = db;

//   return {
//     client: cachedClient,
//     db: cachedDb,
//   };
// }
