import z from "zod";

export const logInSchema = z.object({
  email: z
    .string({ message: "Email field is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be 8-16 characters" })
    .max(16, { message: "Password must be 8-16 characters" }),
});

export type LoginInputs = z.infer<typeof logInSchema>;
