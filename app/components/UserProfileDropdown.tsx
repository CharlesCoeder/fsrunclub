"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface UserProfileDropdownProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: "USER" | "INSTRUCTOR";
  };
  runCount: number;
}

export default function UserProfileDropdown({ user, runCount }: UserProfileDropdownProps) {
  console.log("User image URL:", user.image);
  console.log("Full user object:", user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-auto px-2 flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage 
              src={user.image || '/default-avatar.png'} 
              alt={user.name || 'User'} 
              onError={(e) => {
                console.error("Error loading avatar image:", e);
                e.currentTarget.src = '/default-avatar.png';
              }}
            />
            <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Runs Completed: {runCount}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile/me">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}