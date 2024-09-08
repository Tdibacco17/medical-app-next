import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        // console.log(req.nextauth.token)

        try {
            const session = req.nextauth.token

            if (!session || !session.accessToken) {
                return NextResponse.redirect(new URL('/login', req.url));
            }

            if (session.profiles?.includes('Admin')) {
                return NextResponse.next();
            } else {
                return NextResponse.redirect(new URL('/', req.url));
            }
        } catch (e) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // console.log(token);
                if (!token) return false
                // if (!token.profiles?.includes('Admin')) {
                //     return false
                // }
                return true
            },
        },
    },
)

export const config = {
    matcher: ['/dashboard/:path*'],
};