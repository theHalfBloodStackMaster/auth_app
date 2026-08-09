import mongoose, { connection } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("✅ MongoDB connecetd successfully");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error. Please connect the mongoDB" + err);
      process.exit(1);
    });
  } catch (error) {
    console.log("❌ MongoDB not connected");
    console.log(error);
    process.exit(1);
  }
}
