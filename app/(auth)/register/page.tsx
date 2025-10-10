import AuthLayout from "@/app/(auth)/_components/AuthLayout";
import RegisterForm from "@/app/(auth)/_components/RegisterForm";

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
