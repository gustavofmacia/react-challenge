'use client';

// NextAuth
import { useSession, signOut } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
// Shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/dropdown-menu';
// Icons
import { MdAccountCircle } from 'react-icons/md';

export default function UserSessionMenu() {
  return (
    <SessionProvider>
      <UserMenu />
    </SessionProvider>
  );
}

function UserMenu() {
  const { status } = useSession();

  return (
    status === 'authenticated' && (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MdAccountCircle className="size-10 text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="cursor-default">
            My account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut()}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
