// types/next-auth.d.ts

import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Add id property to user object in session
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id: string; // Add id property to JWT token
  }
}
