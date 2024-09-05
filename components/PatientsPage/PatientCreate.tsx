'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "@radix-ui/react-icons"
import { RefObject, useEffect, useRef, useState } from "react"

export default function PatientCreate() {
    const [isOpen, setIsOpen] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const medicalRecordIdRef = useRef<HTMLInputElement>(null)
    const healthcarePlanRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!isOpen) {
            if (nameRef.current) nameRef.current.value = "";
            if (emailRef.current) emailRef.current.value = "";
            if (phoneRef.current) phoneRef.current.value = "";
            if (medicalRecordIdRef.current) medicalRecordIdRef.current.value = "";
            if (healthcarePlanRef.current) healthcarePlanRef.current.value = "";
        }
    }, [isOpen]);

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button variant={'blue'} className="flex items-center justify-center gap-2 h-9" size={'sm'}><PlusIcon />Crear medico</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto h-full min-w-full wrapper:min-w-[750px] ">
                <form>
                    <SheetHeader>
                        <SheetTitle>Crear medico</SheetTitle>
                        <SheetDescription>
                            Completar con los valores del nuevo profesional.
                        </SheetDescription>
                    </SheetHeader>
                    <div className={`flex flex-col py-8`}>
                        <div className="grid gap-8 h-full">
                            <InfoPatientValues nameRef={nameRef} emailRef={emailRef} phoneRef={phoneRef} medicalRecordIdRef={medicalRecordIdRef} healthcarePlanRef={healthcarePlanRef} />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" variant={'blue'} size={'sm'}>Crear paciente</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent >
        </Sheet >
    )
}

interface InfoPatientValuesInterface {
    nameRef: RefObject<HTMLInputElement>,
    emailRef: RefObject<HTMLInputElement>,
    phoneRef: RefObject<HTMLInputElement>
    medicalRecordIdRef: RefObject<HTMLInputElement>
    healthcarePlanRef: RefObject<HTMLInputElement>
}
function InfoPatientValues({ nameRef, emailRef, phoneRef, medicalRecordIdRef, healthcarePlanRef }: InfoPatientValuesInterface) {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="create-patient-name">Nombre</Label>
                <Input
                    id="create-patient-name"
                    ref={nameRef}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="create-patient-email">Email</Label>
                <Input
                    id="create-patient-email"
                    ref={emailRef}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="create-patient-phone">Teléfono</Label>
                <Input
                    id="create-patient-phone"
                    ref={phoneRef}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="create-patient-phone">Ficha medica</Label>
                <Input
                    id="create-patient-phone"
                    ref={medicalRecordIdRef}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="create-patient-phone">Obra social</Label>
                <Input
                    id="create-patient-phone"
                    ref={healthcarePlanRef}
                    className="col-span-4"
                />
            </div>
        </div>
    )
}