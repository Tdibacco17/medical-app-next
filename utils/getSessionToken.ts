'use server';
import { getToken } from "next-auth/jwt";
import { cookies } from 'next/headers';

export async function getSessionToken() {
    try {
        const session = await getToken({
            req: {
                cookies: {
                    'next-auth.session-token': cookies().get('next-auth.session-token')?.value
                }
            } as any,
            secret: process.env.NEXTAUTH_SECRET as string
        });

        if (!session) {
            return null;
        }
        return session;
    } catch (error) {
        console.error("Failed to get session: ", error);
        return null;
    }
}
