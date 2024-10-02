"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import { Button } from '@/components/ui/button';
import { getUserRunCount } from '@/actions/getUserRunCount';

export default function Header() {
  const { data: session, status } = useSession();
  const [runCount, setRunCount] = useState(0);

  useEffect(() => {
    async function fetchRunCount() {
      if (session?.user?.id) {
        const count = await getUserRunCount(session.user.id);
        setRunCount(count);
      }
    }

    fetchRunCount();
  }, [session]);

  return (
    <header className="absolute top-4 right-4 flex items-center">
      {status === 'authenticated' && session.user ? (
        <UserProfileDropdown 
          user={{
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            role: session.user.role as "USER" | "INSTRUCTOR",
          }} 
          runCount={runCount} 
        />
      ) : (
        <Link href="/login" passHref>
          <Button variant="outline">Log in</Button>
        </Link>
      )}
    </header>
  );
}