import z from "zod";

const loginSchema = z
  .object({
    email: z.string().email("Invalid email format").toLowerCase(),
    password: z.string().min(1, "Password is required"),
  })

  const passwordChangeSchema = z.object({
    currentPassword: z.string().min(1, "Password is required"),
    newPassword: z.string().min(1, "Password is required"),
  })


export {  loginSchema };
