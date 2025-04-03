import { connect } from "mongoose";
import { mongoUri } from "./env.js";
async function connectDB() {
  try {
    await connect(mongoUri);
    console.log("connected");
  } catch (error) {
    console.log("mongoDB connection error");
  }
}

export default connectDB;
