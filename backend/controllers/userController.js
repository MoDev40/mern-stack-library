import { signUpSchema } from "../validation/joiSchemas.js";
import { hash } from "bcryptjs";
import User from "../models/userModel.js";
import { generateOtp, mailOtpHtml } from "../utils/utils.js";
import { mailer } from "../config/config.js";
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

    const hashedOtp = await hash(otp, 10);
    const hashedPassword = await hash(password, 10);

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
