'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        const response = await signIn('credentials', {
            username: username,
            password: password,
            redirect: false,
            // callbackUrl: '/dashboard'
        })
        // console.log(response)
        if (!response?.ok || response?.status === 401) {
            alert('Credenciales invalidas')
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <div>
            Login
            <form onSubmit={handleSubmit} >
                <Input name="username" required type="text" placeholder="Usuario" />
                <Input name="password" required type="password" placeholder="Contraseña" />
                <Button onClick={() => signIn('credentials', {
                    callbackUrl: '/dashboard',
                    redirect: false,
                })}
                    type="submit">
                    Iniciar sesion
                </Button>
            </form>
        </div>
    );
}
