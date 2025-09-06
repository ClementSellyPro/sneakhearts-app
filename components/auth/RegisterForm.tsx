"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { FormField } from "../ui/FormField";
import { authClient } from "@/lib/auth-client";
import { ErrorContext } from "better-auth/react";
import { useRouter } from "next/navigation";
import * as z from "zod";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const UserLog = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 3 caractères"),
    email: z.string().email("Adresse e-mail invalide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const validation = UserLog.safeParse({
      name,
      email,
      password,
    });

    if (!validation.success) {
      const fieldErrors: { name?: string; email?: string; password?: string } =
        {};

      validation.error.issues.forEach((err) => {
        if (err.path[0] === "name") {
          fieldErrors.name = err.message;
        } else if (err.path[0] === "email") {
          fieldErrors.email = err.message;
        } else if (err.path[0] === "password") {
          fieldErrors.password = err.message;
        }
      });

      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      //eslint-disable-next-line
      const { data, error } = await authClient.signUp.email(
        {
          email,
          password,
          name: name,
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
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <FormField
        onChange={(e) => setName(e.target.value)}
        label="Nom:"
        type="text"
        name="name"
        value={name}
        error={errors.name || ""}
        required
      />
      <FormField
        onChange={(e) => setEmail(e.target.value)}
        label="Adresse e-mail:"
        type="email"
        name="email"
        value={email}
        error={errors.email || ""}
        required
      />
      <FormField
        onChange={(e) => setPassword(e.target.value)}
        label="Mot de passe:"
        type="password"
        name="password"
        value={password}
        error={errors.password || ""}
        required
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex justify-between text-xs w-full">
        <p className="w-3/5">
          En continuant, j&apos;accepte la{" "}
          <span className="underline">Politique de confidentialité</span> et aux{" "}
          <span className="underline">Conditions d&apos;utilisation</span>.
        </p>
        <Button type="submit">{isLoading ? "Création..." : "Continuer"}</Button>
      </div>
    </form>
  );
}
