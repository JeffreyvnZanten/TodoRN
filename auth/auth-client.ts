import { createAuthClient } from "better-auth/react";
import Constants from "expo-constants";

const { BASE_URL } = Constants.expoConfig!.extra as { BASE_URL: string };

console.log("🚀 auth-client BASE_URL:", BASE_URL);

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  endpoints: {
    signInEmail: "/auth/sign-in/email",
  },
});
