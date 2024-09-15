import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        accessToken?: string;
        roles?: string[] | null;
    }

    interface Session extends DefaultSession {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        roles?: string[] | null;
    }
}
