import mongoose from "mongoose";

const connectionDB = async () => {
  return await mongoose
    .connect("mongodb://localhost:27017/mongoose")
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log("db connected fail", err);
    });
};

export default connectionDB;
