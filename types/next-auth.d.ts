import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        id?: string | null;
        accessToken?: string;
        profiles?: string[] | null;
    }

    interface Session extends DefaultSession {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            id?: string | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string | null;
        accessToken?: string;
        profiles?: string[] | null;
    }
}
