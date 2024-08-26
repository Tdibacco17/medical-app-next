'use client'
import { signOut } from "next-auth/react";

export default function ButtonSignOut() {
    return <button onClick={() => signOut()} className="bg-blue-400 px-4">
        Cerrar 
    </button>
}