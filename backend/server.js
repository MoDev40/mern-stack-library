import express from "express";
import { port } from "./config/env.js";

const app = express();

app.listen(port, () => console.log(`server listen:http://localhost:${port}/`));
