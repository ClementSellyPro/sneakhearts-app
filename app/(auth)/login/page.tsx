import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      title="Se connecter"
      alternativeAction={{
        text: "Pas encore de compte ?",
        linkText: "S'inscrire'",
        href: "/register",
      }}
    >
      <LoginForm />
    </AuthLayout>
  );
}
