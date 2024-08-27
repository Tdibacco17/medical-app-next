import { getServerSession } from "next-auth";

export default async function Dashboard() {
    const session = await getServerSession()

    return (
        <div>
            Dashboard
            <div>
                <p>{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
            </div>
        </div>
    );
}
