import { loginSchema, signUpSchema } from "../validation/joiSchemas.js";
import User from "../models/userModel.js";
import { generateOtp } from "../utils/utils.js";
import { mailer } from "../config/config.js";
import { compareIt, hashIt } from "../utils/bcrypt.js";
import { mailOtpHtml } from "../utils/mailTemplates.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";
export const signUp = async (req, res) => {
  try {
    const { error, value } = signUpSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", details: error.details });
    }

    const { username, password, email } = value;

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res
        .status(400)
        .json({ message: "Duplicate error:User is already exists" });
    }
    const otp = generateOtp();

    const hashedOtp = await hashIt(otp);
    const hashedPassword = await hashIt(password);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      otp: hashedOtp,
    });

    await user.save();

    await mailer.sendMail({
      to: email,
      from: "Ben Library",
      subject: "Your Verification Code",
      html: mailOtpHtml(otp, username),
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const logIn = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    const { email, password } = value;

    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", details: error.details });
    }

    const isUserExists = await User.findOne({ email }).select(
      "password username isVerified email role"
    );

    if (!isUserExists) {
      return res
        .status(404)
        .json({ message: "Not Found error:User is not exists" });
    }

    const { password: hashedPassword, username, isVerified } = isUserExists;

    if (!isVerified) {
      const otp = generateOtp();
      const hashedOtp = await hashIt(otp);

      const updateUserOtp = User.findOneAndUpdate(
        { email },
        { $set: { otp: hashedOtp } }
      );

      const sendOtp = mailer.sendMail({
        to: email,
        from: "Ben Library",
        subject: "Your Verification Code",
        html: mailOtpHtml(otp, username),
      });

      await Promise.all([updateUserOtp, sendOtp]);

      return res
        .status(401)
        .json({ message: "Verification error:User is not verified" });
    }

    const isMatch = await compareIt(password, hashedPassword);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Authentication error:Invalid credentials passed" });
    }

    const payload = { ...isUserExists._doc, password: undefined };
    const expiresIn = 30 * 60 * 1000;

    const token = jwt.sign(payload, jwtSecret, { expiresIn });

    res.cookie("token", token, { maxAge: expiresIn, httpOnly: true });
    res
      .status(200)
      .json({ message: "Successfully login", token, user: payload });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getUser = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
