import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose
    .connect(url, { dbName: "talk-trove" })
    .then((data) => {
      console.log(`Connected to MongoDB on ${data.connection.host}`);
    })
    .catch((error) => {
      throw error;
    });
};

export { connectDB };
