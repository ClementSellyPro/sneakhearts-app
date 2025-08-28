import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="Connecter vous"
      alternativeAction={{
        text: "Pas encore de compte ?",
        linkText: "S'inscrire",
        href: "/login",
      }}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
