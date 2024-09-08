'use client'

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div>
      Home
      <br></br>
      <br></br>
      <Button variant={'secondary'} onClick={() => signOut()}>
        Cerrar sesion
      </Button>
    </div>
  );
}
