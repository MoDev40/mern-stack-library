import { configDotenv } from "dotenv";
configDotenv();

export const port = process.env.PORT;
export const mongoUri = process.env.MONGO_URI;
