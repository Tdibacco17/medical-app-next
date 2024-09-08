'use server'
import { getToken } from "next-auth/jwt";
import { cookies } from 'next/headers';

export async function getPatientsData() {
    try {
        const session = await getToken({
            req: {
                cookies: {
                    'next-auth.session-token': cookies().get('next-auth.session-token')?.value
                }
            } as any,
            secret: process.env.NEXTAUTH_SECRET as string
        });
        // console.log('[SESIONS]', session)
        return session;
    } catch (error) {
        // console.error("Error getting token:", error);
        throw new Error("Failed to get session");
    }
}