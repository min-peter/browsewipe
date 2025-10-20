import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords do not match",
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
