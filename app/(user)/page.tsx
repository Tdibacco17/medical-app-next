'use client'

import { Button, buttonVariants } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center flex flex-col items-center gap-4">
      <Link href={'/login'} className={buttonVariants({ variant: 'link' })}>
        Login
      </Link>
      <Button variant={'secondary'} onClick={() => signOut()}>
        Cerrar sesion
      </Button>
    </div>
  );
}
