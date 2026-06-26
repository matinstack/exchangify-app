import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },

  plugins: [nextCookies()],

  user: {
    additionalFields: {
      lastName: {
        type: "string",
        required: true,
      },
    },
  },
  //
});
