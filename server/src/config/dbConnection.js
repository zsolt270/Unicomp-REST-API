import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Database connection was successful");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
};

export default connectDB;
