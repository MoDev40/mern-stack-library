import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import connectDB from "./config/db.js";
import { port } from "./config/env.js";
import userRoute from "./routes/userRoute.js";

const app = express();

app.use(cookieParser());
app.use(json());
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

app.use("/api/auth", userRoute);
app.use("/api/user", userRoute);

connectDB();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => console.log(`server listen:http://localhost:${port}/`));
