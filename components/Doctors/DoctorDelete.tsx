'use client'
import { deleteDoctorById } from "@/app/actions/doctors"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "sonner";

export default function DoctorDelete({ doctorId }: { doctorId: string }) {

    const handleDelete = async (doctorId: string) => {
        const response = await deleteDoctorById({ doctorId });

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }
        if (response.status !== 200) {
            toast.info(response.message)
            return;
        }

        toast.success(response.message);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="text-destructive w-full text-left justify-start px-2 py-1/5">Eliminar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Atención</AlertDialogTitle>
                    <AlertDialogDescription>
                        Seguro que quieres eliminar a este medico?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={() => handleDelete(doctorId)}>
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}