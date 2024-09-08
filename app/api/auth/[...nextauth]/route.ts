import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // console.log(credentials)

                const response = await fetch(`${process.env.APIGATEWAY_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                })

                const parseReponse = await response.json()

                if (parseReponse.status !== 200) {
                    return null
                }

                const user = {
                    id: parseReponse.data.idUser,
                    profiles: parseReponse.data.profiles,
                    accessToken: parseReponse.data.token,
                }
                return user
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.profiles = user.profiles;
                token.accessToken = user.accessToken;
            }
            // console.log('JWT Callback:', token);
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id?.toString();
            // session.user.accessToken  = token.accessToken ;
            // console.log('Session Callback:', session);
            return session;
        },
    },
    pages: {
        signIn: '/login'
    }
})

export { handler as GET, handler as POST }