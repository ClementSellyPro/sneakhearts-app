import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      title="Créer un compte"
      alternativeAction={{
        text: "Déjà inscrit ?",
        linkText: "Se connecter",
        href: "/register",
      }}
    >
      <LoginForm />
    </AuthLayout>
  );
}
