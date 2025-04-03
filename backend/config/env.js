import { configDotenv } from "dotenv";
configDotenv();

export const port = process.env.PORT;
export const mongoUri = process.env.MONGO_URI;
export const nodeMailerUser = process.env.NODE_MAILER_USER;
export const nodeMailerPassword = process.env.NODE_MAILER_PASSWORD;
