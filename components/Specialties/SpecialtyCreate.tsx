'use client'
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createSpecialtyName } from "@/app/actions/specialty";
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SpecialtyCreate() {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();
        const inputName = inputRef.current?.value || "";

        const response = await createSpecialtyName({ name: inputName })

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }
        if (response.status !== 201) {
            toast.info(response.message)
            return;
        }

        if (inputRef.current) inputRef.current.value = "";
        toast.success(response.message);
    }
    return (
        <form onSubmit={handleCreate}>
            <div className={`flex flex-col gap-8 py-8`}>
                <div className="grid grid-cols-7 items-center gap-4">
                    <Label htmlFor="create-specialty-name" className="col-span-2">Nueva especialidad</Label>
                    <Input id="create-specialty-name" ref={inputRef} type="text" className="col-span-5" placeholder={`Nombre...`} />
                </div>
                <Separator />
            </div>
            <div className="flex justify-end w-full">
                <Button type="submit" variant={"blue"} >Guardar</Button>
            </div>
        </form>
    )
}