import express, { json } from "express";
import { port } from "./config/env.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import userRoute from "./routes/userRoute.js";

const app = express();

app.use(cookieParser());
app.use(json());
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

app.use("/api/auth", userRoute);

app.get("/", (req, res) => {
  const cookie = req.cookies;
  res.json(cookie);
});

connectDB();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => console.log(`server listen:http://localhost:${port}/`));
