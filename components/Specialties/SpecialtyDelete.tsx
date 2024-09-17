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
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

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
            toast.info(response.message);
            return;
        }

        setSelectedValue("");
        toast.success(response.message);
    }

    return (
        <div className={`flex flex-col gap-8 py-8`}>
            <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="create-specialty-name" className="col-span-2">Seleccionar especialidad</Label>
                {data?.length > 0
                    ? <Select onValueChange={setSelectedValue} value={selectedValue || ""}>
                        <SelectTrigger className="col-span-5">
                            <SelectValue placeholder={`Especialidades`} />
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
                    : <p className="h-9 px-3 py-1 flex items-center justify-start border-transparent text-xs text-muted-foreground col-span-5">
                        No hay existencias...
                    </p>}
            </div>
            <Separator />
            <div className="flex justify-end w-full">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button disabled={data?.length === 0} type="button" variant={"destructive"}>Eliminar</Button>
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
        </div>
    )
}