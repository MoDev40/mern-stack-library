import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers["cookie"]?.split("token=")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization error:token is not found" });
    }
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Authorization error:token is not valid" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Authorization error:user is not admin" });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: "Admin middleware" });
  }
};
