import { z } from "zod";

export const registerSchema = z
  .object({
      fullname: z.string().min(3),
      email: z.string().email("Please enter a valid email address"),
      password: z
          .string()
          .min(1, "Please enter a password")
          .min(8, "Please enter a password with at least 8 characters"),
      confirmPassword: z.string().min(1, "Please enter a confirm password"),
      terms: z.literal(true, {
          errorMap: () => ({
              message: "You must agree to the terms and conditions",
          }),
      }),
      phoneNumber: z.string()
          .refine(value => /^0\d{8,}$/.test(value), {
              message: 'Phone number contain only number, start with 0 and have at least 9 digits',
          })
  })
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
