import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://sneakhearts.sellyclement.dev",
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
