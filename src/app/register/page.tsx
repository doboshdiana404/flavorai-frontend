import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthFormWrapper
      title="Create your account"
      description="Start saving and discovering recipes with FlavorAI."
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkHref="/login"
    >
      <RegisterForm />
    </AuthFormWrapper>
  );
}
