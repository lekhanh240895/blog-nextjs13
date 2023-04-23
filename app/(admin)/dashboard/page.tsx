"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  console.log({ session });

  return <main>Welcome {session?.user?.name}</main>;
}
