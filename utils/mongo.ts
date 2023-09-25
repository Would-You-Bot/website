import mongoose from "mongoose";

// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.ts

declare global {
  var mongoose: any;
}

const MONGO_URI = process.env.MONGO!;

if (!MONGO_URI) {
  throw new Error(
    "The MONGO environment variable was not provided. Unable to connect to database.",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = await mongoose
      .connect(MONGO_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDb;
