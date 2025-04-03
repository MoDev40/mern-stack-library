import Joi from "joi";

export const signUpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email field is required",
  }),
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must be at most 30 characters",
    "any.required": "Username is required",
  }),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});
