import AuthLayout from "@/app/(auth)/_components/AuthLayout";
import LoginForm from "@/app/(auth)/_components/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      title="Se connecter"
      alternativeAction={{
        text: "Pas encore de compte ?",
        linkText: "S'inscrire",
        href: "/register",
      }}
    >
      <LoginForm />
    </AuthLayout>
  );
}
