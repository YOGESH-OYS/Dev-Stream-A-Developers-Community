// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;
// console.log("MONGODB_URI from env:", process.env.MONGODB_URI);
// if (!MONGODB_URI) {
//   console.error("⚠️ MONGODB_URI is missing in .env.local");
//   throw new Error("Please define MONGODB_URI inside .env.local");
// }

// let isConnected = false;

// export default async ()=>{
//   if (isConnected) return;

//   try {
//     await mongoose.connect(MONGODB_URI as string);
//     isConnected = true;
//     console.log("✅ Connected to MongoDB");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     throw error;
//   }
// }
