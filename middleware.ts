import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    try {
        const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        // console.log('Session:', session);

        if (!session || !session.accessToken) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (session.profiles?.includes('Admin')) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }catch(e){
        return NextResponse.redirect(new URL('/', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};