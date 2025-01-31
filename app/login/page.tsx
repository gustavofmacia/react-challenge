// NextAuth
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
// Next
import { redirect } from 'next/navigation';
// Components
import LoginForm from '@/ui/login/login-form';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/');
  }

  return (
    <>
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <LoginForm />
      </div>
    </>
  );
}
