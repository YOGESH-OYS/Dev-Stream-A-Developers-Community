import mongoose from 'mongoose'
import Userdatas from '@/models/Usecases';
const MONGO_URI = process.env.MONGODB_URI as string;

if (!MONGO_URI) {
  throw new Error("⚠️ Please define the MONGO_URI environment variable inside .env.local");
}

// Global cache to prevent multiple connections in dev (Hot Reload issue)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    }).then(async (mongoose) => {
      console.log("✅ Connected to MongoDB");
      const userdata = await Userdatas.create({
        title: "Add Two Numbers",
        timestamp: "2025-09-25T12:00:00.000Z",
        session: 42,
        testcase: {
          question: {
            question_id: 1,
            question: "Given two numbers, return their sum."
          },
          testcases: [
            {
              question_id: 1,
              type: "sample",
              cases: "Input: 2 3\nOutput: 5"
            },
            {
              question_id: 1,
              type: "hidden",
              cases: "Input: -1 3\nOutput: 2"
            }
          ]
        }
      }
    )
      return mongoose;
    }).catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
