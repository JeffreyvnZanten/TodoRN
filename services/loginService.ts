import { authClient } from "../auth/auth-client";

export const performLogin = async () => {
  try {
    const { data, error } = await authClient.signIn.email({
      email: "test@example.com",
      password: "veiligWachtwoord123",
    });

    if (error) {
      console.error("Login mislukt:", error);
      return;
    }

    console.log("Ingelogd als:", data.user);
  } catch (err: any) {
    console.error("Verbindingsfout of andere error:", err);
  }
};
