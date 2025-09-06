"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { FormField } from "../ui/FormField";
import { authClient } from "@/lib/auth-client";
import * as z from "zod";

const UserLog = z.object({
  email: z.email(),
  password: z.string(),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const validation = UserLog.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      setIsLoading(false);
      return;
    }

    try {
      //eslint-disable-next-line
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false,
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <FormField
        label="Adresse e-mail:"
        type="email"
        name="email"
        error=""
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormField
        label="Mot de passe:"
        type="password"
        name="password"
        error=""
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="flex justify-between text-xs w-full">
        <p className="w-3/5">
          En continuant, j&apos;accepte la{" "}
          <span className="underline">Politique de confidentialité</span> et aux{" "}
          <span className="underline">Conditions d&apos;utilisation</span>.
        </p>
        <Button type="submit">
          {isLoading ? "Connexion..." : "Continuer"}
        </Button>
      </div>
    </form>
  );
}
