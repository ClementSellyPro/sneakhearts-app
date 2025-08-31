import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="Créer un compte"
      alternativeAction={{
        text: "Déjà inscrit ?",
        linkText: "Se connecter",
        href: "/login",
      }}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
