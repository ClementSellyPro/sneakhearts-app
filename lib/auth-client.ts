import { createAuthClient } from "better-auth/react";
// baseURL: "https://sneakhearts.sellyclement.dev",
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
