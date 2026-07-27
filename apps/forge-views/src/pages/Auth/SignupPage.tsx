import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export default function Signup() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your engineering journey."
    >
      <SignupForm />
    </AuthLayout>
  );
}