'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <Button onClick={() => signIn()}>Sign in</Button>
    );
  }

  return (
    <div>
      <p>Signed in as {session?.user?.email}</p>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}