'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { SpinIcon } from "@/components/Icons/Icons";

export default function Login() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) return
        setLoading(true);

        const response = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
            // callbackUrl: '/dashboard'
        })
        // console.log(response)
        if (!response?.ok || response?.status === 401) {
            setErrorMessage('Credenciales invalidas');
            setLoading(false);
            setTimeout(() => {
                setErrorMessage(null);
            }, 4000)
        } else {
            setTimeout(() => {
                setLoading(false);
                router.push('/dashboard')
            }, 2000)
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Iniciar sesión</CardTitle>
                <CardDescription>Ingresa con tus credenciales</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="login-email">Email</Label>
                            <Input id="login-email" name="email" placeholder="m@example.com" type="email" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="login-password">Contraseña</Label>
                            {/* <div className="flex items-center">
                                <Link href="#" className="ml-auto inline-block text-xs text-muted-foreground underline">
                                    Cambiar contraseña?
                                </Link>
                            </div> */}
                            <Input id="login-password" name="password" placeholder="********" type="password" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col justify-between gap-4 w-full">
                    <Button disabled={loading} type="submit" className="w-full" variant={'blue'}>
                        {loading && <SpinIcon />} Iniciar sesión
                    </Button>
                    {errorMessage && <small className="text-sm text-destructive">{errorMessage}</small>}
                </CardFooter>
            </form>
        </Card>
    );
}
