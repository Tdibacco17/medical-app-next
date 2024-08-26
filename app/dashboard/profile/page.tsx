'use client'
import { useSession } from "next-auth/react";
export default function Profile() {
    const { data: session, status, update } = useSession()

    if (status === "loading") return <div>Cargando...</div>

    return (
        <div className="flex flex-col gap-8 items-center bg-gray-300 p-12">
            Profile
            <div>
                <p>{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
            </div>
        </div>
    );
}