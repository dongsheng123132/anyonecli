import { z } from "zod";

const RESERVED_NAMES = new Set([
  "api",
  "admin",
  "directory",
  "register",
  "login",
  "settings",
  "about",
  "help",
  "docs",
  "static",
  "public",
  "favicon",
]);

export function isReservedName(name: string): boolean {
  return RESERVED_NAMES.has(name);
}

const commandSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
});

const contactSchema = z
  .object({
    github: z.string().max(100).optional(),
    x: z.string().max(100).optional(),
    email: z.string().email().optional(),
    website: z.string().url().optional(),
  })
  .optional();

export const registerSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30)
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Must be lowercase letters, numbers, and hyphens. Cannot start or end with a hyphen."
    )
    .refine((n) => !n.includes("--"), "Cannot contain consecutive hyphens"),
  display_name: z.string().min(1).max(60),
  bio: z.string().min(10).max(280),
  skills: z
    .array(z.string().min(1).max(50))
    .min(1)
    .max(20),
  commands: z.array(commandSchema).max(20).optional(),
  contact: contactSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
