'use client'
import { signIn } from "next-auth/react"

export default function Login() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        const response = await signIn('credentials', {
            username: username,
            password: password,
            redirect: false,
            callbackUrl: '/dashboard'
        })
        // console.log(response)
        // if (!response?.ok) {
        //     alert('Credenciales invalidas')
        // }
    }

    return (
        <div className="flex flex-col gap-8 items-center bg-gray-300 p-12">
            Login
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="username" required type="text" placeholder="Usuario" />
                <input name="password" required type="password" placeholder="Contraseña" />
                <button onClick={() => signIn('credentials', {
                    callbackUrl: '/dashboard',
                    redirect: false,
                })}
                    type="submit">
                    Iniciar sesion
                </button>
            </form>
        </div>
    );
}
