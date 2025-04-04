import express from "express";
import { logIn, signUp, getUser } from "../controllers/userController.js";
import { authenticate } from "../middlewares/middleware.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/log-in", logIn);

router.get("/", authenticate, getUser);
export default router;
