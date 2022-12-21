import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB);
    console.log(`MongoDB Connected :${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

export default connectDB;
