import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// To keep track of connection in dev (avoid multiple connections)
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache ?? { conn: null, promise: null };

if (process.env.NODE_ENV !== "production") {
  global.mongooseCache = cached;
}

async function connectDb(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongooseInstance) => {
      console.log("MongoDB connected");
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDb;
