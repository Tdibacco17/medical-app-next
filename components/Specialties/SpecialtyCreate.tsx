'use client'
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createSpecialtyName } from "@/app/actions/specialty";

export default function SpecialtyCreate() {
    const [inputName, setInputName] = useState<string>("");

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();

        const response = await createSpecialtyName({ name: inputName })

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }
        if (response.status !== 201) {
            toast.info(response.message)
            return;
        }

        setInputName("")
        toast.success(response.message);
    }
    return (
        <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
            <Input value={inputName} onChange={(e) => setInputName(e.target.value)} type="text" placeholder={`Nueva especialidad...`} />
            <Button disabled={inputName.trim().length === 0} type="submit" variant={"blue"} >Guardar</Button>
        </form>
    )
}