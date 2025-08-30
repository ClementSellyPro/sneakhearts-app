"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { FormField } from "../ui/FormField";
import { authClient } from "@/app/lib/auth-client";
import { ErrorContext } from "better-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email(
        {
          email,
          password,
          name: name || "Nouvelle Utilisateur",
          callbackURL: "/",
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onError: (ctx: ErrorContext) => {
            setError(ctx.error.message);
            setIsLoading(false);
          },
          onSuccess: (ctx) => {
            console.log("Inscription réussie !", ctx.data);
            setIsLoading(false);
            router.push("/");
          },
        }
      );
    } catch (err) {
      setError("Une erreur inattendue s'est produite");
      console.error("Erreur lors de l'inscription:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-6">
      <FormField
        onChange={(e) => setEmail(e.target.value)}
        label="Adresse e-mail:"
        type="email"
        name="email"
        error=""
        required
      />
      <FormField
        onChange={(e) => setPassword(e.target.value)}
        label="Mot de passe:"
        type="password"
        name="password"
        error=""
        required
      />
      <div className="flex justify-between text-xs w-full">
        <p className="w-3/5">
          En continuant, j&apos;accepte la{" "}
          <span className="underline">Politique de confidentialité</span> et aux{" "}
          <span className="underline">Conditions d&apos;utilisation</span>.
        </p>
        <Button onClick={(e) => onSubmit(e)}>Continuer</Button>
      </div>
    </form>
  );
}
