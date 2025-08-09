// lib/mongodb.js
import { MongoClient } from "mongodb";

let clientPromise = global._mongoClientPromise;

if (!clientPromise) {
  if (process.env.MONGODB_URI) {
    const client = new MongoClient(process.env.MONGODB_URI);
    clientPromise = client.connect();
  } else {
    // Don't throw when missing locally — just resolve to null
    clientPromise = Promise.resolve(null);
  }
  global._mongoClientPromise = clientPromise;
}

export default clientPromise;
