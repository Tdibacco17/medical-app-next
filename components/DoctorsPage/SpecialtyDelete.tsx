'use client'
import { FormEvent, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { SpecialtyDataInterface } from "@/types/DoctorTypes";
import { toast } from "sonner";
import { deleteSpecialtyById } from "@/app/actions/specialty";

export default function SpecialtyDelete({ data }: { data: SpecialtyDataInterface[] }) {
    const [selectedValue, setSelectedValue] = useState<string>("");

    const handleDelete = async (e: FormEvent) => {
        e.preventDefault();
        const response = await deleteSpecialtyById({ id: selectedValue })

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }

        if (response.status !== 200) {
            toast.warning(response.message);
            return;
        }

        setSelectedValue("");
        toast.success(response.message);
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {data.length > 0
                ? <Select onValueChange={setSelectedValue} value={selectedValue || ""}>
                    <SelectTrigger>
                        <SelectValue placeholder={`Seleccionar especialidad`} />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                        <SelectGroup >
                            {data?.map((item: SpecialtyDataInterface, index: number) => {
                                return <SelectItem key={index} value={`${item.id}`}>
                                    {item.description}
                                </SelectItem>
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                : <p className="py-2 h-9 text-muted-foreground text-sm">No hay existencias.</p>}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button disabled={selectedValue === ""} type="button" variant={"destructive"} >Eliminar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Atención</AlertDialogTitle>
                        <AlertDialogDescription>
                            Seguro que quieres eliminar esta especialidad?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
                        <form onSubmit={handleDelete}>
                            <AlertDialogAction type="submit" className={buttonVariants({ variant: 'destructive' })} >
                                Eliminar
                            </AlertDialogAction>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}