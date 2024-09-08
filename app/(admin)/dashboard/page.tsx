// import { getServerSession } from "next-auth";

// export default async function Dashboard() {
//     const session = await getServerSession()

//     return (
//         <div>
//             Dashboard
//             <div>
//                 <pre>
//                     <code>
//                         {JSON.stringify(session, null, 2)}
//                     </code>
//                 </pre>
//             </div>
//         </div>
//     );
// }

'use client'
import { useSession } from "next-auth/react";
export default function Profile() {
    const { data: session, status, update } = useSession()

    if (status === "loading") return <div>Cargando...</div>

    return (
        <div className="flex flex-col gap-8 items-center p-12">
            Profile
            <div className="w-full text-wrap break-words">
                <div>
                <pre>
                    <code>
                        {JSON.stringify(session, null, 2)}
                    </code>
                </pre>
            </div>
            </div>
        </div>
    );
}