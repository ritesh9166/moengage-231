import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/moenagge`
    );
    console.log(
      `\n MongoDB connected !! DB HOST :: ${connectInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED :: ", error);
  }
};

export default connectDB;
