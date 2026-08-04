import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  session: {
    expiresIn: 60 * 60 * 24 * 14,

    updateAge: 60 * 60 * 48,
  },

  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },

  advanced: {
    cookiePrefix: "expensely",
  },

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    nextCookies(),
    // phoneNumber({
    //   sendOTP: ({ phoneNumber, code }, ctx) => {
    //     // Implement sending OTP code via SMS
    //   },
    //   signUpOnVerification: {
    //     getTempEmail: (phoneNumber) => {
    //       return `${phoneNumber}@my-site.com`;
    //     },
    //     //optionally, you can also pass `getTempName` function to generate a temporary name for the user
    //     getTempName: (phoneNumber) => {
    //       return phoneNumber; //by default, it will use the phone number as the name
    //     },
    //   },
    // }),
  ],

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
