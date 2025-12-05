import mongoose from "mongoose";

const DATABSE_NAME = process.env.DATABASE_NAME;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable.');
}

let isConnected = false;

export const connectMongoose = async () => {

  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DATABSE_NAME,
      bufferCommands: false, // Recommended for serverless environments
    });

    isConnected = true;
    console.log('=> using new Mongoose database connection');
  } catch (error) {
    console.error('Error connecting to Mongoose:', error);
    isConnected = false; 
    throw error;
  }
};