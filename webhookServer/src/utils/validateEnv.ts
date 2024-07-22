import "dotenv/config";
import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().min(100).max(65535).default(3001),
    ENV_TYPE: z.enum(["PROD", "DEV"]).default("PROD"),
})

export const socketServerEnv = envSchema.parse({
    PORT: process.env.PORT,
    ENV_TYPE: process.env.ENV_TYPE,
})