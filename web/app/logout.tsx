'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function Logout() {
  return (
    <Button type="submit" variant="link" className="text-[#1300E1]"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  );
}
