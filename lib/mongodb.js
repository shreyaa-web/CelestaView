// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri || "mongodb://invalid");
  global._mongoClientPromise = uri
    ? client.connect()
    : Promise.reject(new Error("No MONGODB_URI set"));
}

clientPromise = global._mongoClientPromise;
export default clientPromise;
