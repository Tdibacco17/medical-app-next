'use client'
import { Separator } from "@/components/ui/separator"
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
import { useCallback, useEffect, useState } from "react"
import { PatientInterface } from "@/types/PatientsTypes"

interface NewFormDataPatientInterface {
    name: string;
    email: string;
    phone: string;
    medicalRecordId: number,
    healthcarePlan?: string
}

export default function PatientEdit({ patientData }: { patientData: PatientInterface }) {
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState<NewFormDataPatientInterface>({
        name: patientData.name,
        email: patientData.email,
        phone: patientData.phone,
        medicalRecordId: patientData.medicalRecordId,
        healthcarePlan: patientData.healthcarePlan ? patientData.healthcarePlan : ""
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: patientData.name,
                email: patientData.email,
                phone: patientData.phone,
                medicalRecordId: patientData.medicalRecordId,
                healthcarePlan: patientData.healthcarePlan ? patientData.healthcarePlan : ""
            })
        }
    }, [isOpen]);

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="w-full text-left justify-start px-2 py-1/5">Editar</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto h-full min-w-full wrapper:min-w-[750px] ">
                <form>
                    <SheetHeader >
                        <SheetTitle>Editar paciente</SheetTitle>
                        <SheetDescription>
                            Completar con los valores que desee cambiar.
                        </SheetDescription>
                    </SheetHeader>
                    <div className={`flex flex-col py-8`}>
                        <div className="grid gap-8 h-full">
                            <InfoPatientValues formData={formData} handleChange={handleChange} />
                            {/* <Separator /> */}
                        </div>
                    </div>
                    <SheetFooter >
                        <SheetClose asChild >
                            <Button type="submit" variant={'blue'} size={'sm'}>Guardar cambios</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}

interface InfoPatientValuesInterface {
    formData: NewFormDataPatientInterface,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
function InfoPatientValues({ formData, handleChange }: InfoPatientValuesInterface) {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-patient-name">Nombre</Label>
                <Input
                    id="edit-patient-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-patient-specialty">Email</Label>
                <Input
                    id="edit-patient-specialty"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-patient-email">Teléfono</Label>
                <Input
                    id="edit-patient-email"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-patient-phone">Ficha medica</Label>
                <Input
                    id="edit-patient-phone"
                    name="medicalRecordId"
                    value={formData.medicalRecordId}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-patient-phone">Obra social</Label>
                <Input
                    id="edit-patient-phone"
                    name="healthcarePlan"
                    value={formData.healthcarePlan}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
        </div>
    )
}