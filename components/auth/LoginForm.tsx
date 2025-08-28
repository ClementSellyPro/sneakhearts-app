import Button from "../ui/Button";
import { FormField } from "../ui/FormField";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-6">
      <FormField
        label="Adresse e-mail:"
        type="email"
        name="email"
        error=""
        required
      />
      <FormField
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
        <Button>Continuer</Button>
      </div>
    </form>
  );
}
