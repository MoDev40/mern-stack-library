import { connect } from "mongoose";
import { mongoUri } from "./env.js";
async function connectDB() {
  try {
    await connect(mongoUri);
    console.log("db connected");
  } catch (error) {
    console.log("db connection error");
  }
}

export default connectDB;
