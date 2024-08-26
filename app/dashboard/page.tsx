import ButtonSignOut from "@/components/ButtonSignOut/ButtonSignOut";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
    const session = await getServerSession()

    return (
        <div className="flex flex-col gap-8 items-center bg-gray-300 p-12">
            Dashboard
            <div>
                <p>{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
            </div>
            <ButtonSignOut />
        </div>
    );
}
