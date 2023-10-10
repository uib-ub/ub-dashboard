import LoginButton from '@/components/auth/login-button';
import LogoutButton from '@/components/auth/logout-button';
import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav';
import { getServerSession } from "next-auth";


interface Session {
  user?: {
    name: string;
    email: string;
  };
}

export default async function Home() {
  const session: Session = (await getServerSession()) ?? {};

  return (
    <>
      <header className="flex items-center px-6 py-2 border-b">
        <div className='font-semibold lowercase'>UB DASHBOARD</div>
        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
          {Object.keys(session).length === 0 ? (
            <LoginButton />
          ) : (
            <UserNav user={session.user} />
          )}
        </div>
      </header>
      <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-between p-4">
      </main>
    </>
  )
}
