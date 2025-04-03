import { createTransport } from "nodemailer";
import { nodeMailerPassword, nodeMailerUser } from "./env.js";

export const mailer = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: nodeMailerUser,
    pass: nodeMailerPassword,
  },
});
