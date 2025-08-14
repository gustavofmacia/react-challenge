// NextAuth
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
// Next
import { redirect } from "next/navigation";
// Components
import LoginForm from "@/ui/login/login-form";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }

  return (
    <>
      <div className="mt-10 flex flex-col items-center justify-center md:mt-24">
        <LoginForm />
      </div>
    </>
  );
}
