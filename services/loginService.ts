import Constants from "expo-constants";
import { authClient } from "../auth/auth-client";

const { AUTH_EMAIL, AUTH_PASSWORD } = Constants.expoConfig!.extra as {
  AUTH_EMAIL: string;
  AUTH_PASSWORD: string;
};

export const performLogin = async () => {
  try {
    const { data, error } = await authClient.signIn.email({
      email: AUTH_EMAIL,
      password: AUTH_PASSWORD,
    });

    if (error) {
      console.error("Login mislukt:", error);
      return;
    }
  } catch (error: any) {
    console.error("Verbindingsfout of andere error:", error);
  }
};
