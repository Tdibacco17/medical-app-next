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
import { DoctorIntarface, TimeSlot, WorkDay } from "@/types/DoctorTypes"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { timeDataAfternoon, timeDataMorning } from "@/models/doctor"

interface NewFormDataDoctorInterface {
    name: string,
    specialty: string,
    email: string,
    phone: string,
}

export default function DoctorEdit({ doctorData }: { doctorData: DoctorIntarface }) {
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState<NewFormDataDoctorInterface>({
        name: doctorData.name,
        specialty: doctorData.specialty,
        email: doctorData.email,
        phone: doctorData.phone,
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }, []);

    const [workingTime, setWorkingTime] = useState<WorkDay[]>(doctorData.working_time);

    const handleTimeSlotChange = useCallback((dayId: number, timeOfDay: 'morning' | 'afternoon', field: 'from' | 'to', value: string) => {
        setWorkingTime(prevWorkingTime =>
            prevWorkingTime.map(day =>
                day.id === dayId
                    ? {
                        ...day,
                        [timeOfDay]: {
                            ...day[timeOfDay],
                            [field]: value === 'No disponible' ? null : value
                        } as TimeSlot
                    }
                    : day
            )
        );
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setWorkingTime(doctorData.working_time);
            setFormData({
                name: doctorData.name,
                specialty: doctorData.specialty,
                email: doctorData.email,
                phone: doctorData.phone,
            })
        }
    }, [isOpen]);

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="w-full text-left justify-start px-2 py-1/5">Editar</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto h-full min-w-full wrapper:min-w-[750px] ">
                <SheetHeader >
                    <SheetTitle>Editar medico</SheetTitle>
                    <SheetDescription>
                        Completar con los valores que desee cambiar.
                    </SheetDescription>
                </SheetHeader>
                <div className={`flex flex-col py-8`}>
                    <form className="grid gap-8 h-full">
                        <InfoDoctorValues formData={formData} handleChange={handleChange} />
                        <Separator />
                        <InfoTimesValues doctorData={doctorData} handleTimeSlotChange={handleTimeSlotChange} />
                    </form>
                </div>
                <SheetFooter >
                    <SheetClose asChild >
                        <Button type="submit" variant={'blue'} size={'sm'}>Guardar cambios</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

interface InfoDoctorValues {
    formData: NewFormDataDoctorInterface,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
function InfoDoctorValues({ formData, handleChange }: InfoDoctorValues) {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-doctor-name">Nombre</Label>
                <Input
                    id="edit-doctor-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-doctor-specialty">Especialidad</Label>
                <Input
                    id="edit-doctor-specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-doctor-email">Email</Label>
                <Input
                    id="edit-doctor-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-doctor-phone">Teléfono</Label>
                <Input
                    id="edit-doctor-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
        </div>
    )
}

interface InfoTimesValuesInterace {
    doctorData: DoctorIntarface;
    handleTimeSlotChange: (dayId: number, timeOfDay: 'morning' | 'afternoon', field: 'from' | 'to', value: string) => void;
}
function InfoTimesValues({ doctorData, handleTimeSlotChange }: InfoTimesValuesInterace) {

    const morningOptions = useMemo(() => timeDataMorning.map(time => (
        <SelectItem key={`morning-${time}`} value={time}>
            {time}
        </SelectItem>
    )), []);

    const afternoonOptions = useMemo(() => timeDataAfternoon.map(time => (
        <SelectItem key={`afternoon-${time}`} value={time}>
            {time}
        </SelectItem>
    )), []);

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 gap-4">
                <Label className="text-muted-foreground">Dia</Label>
                <Label className="col-span-2 text-muted-foreground">Mañana</Label>
                <Label className="col-span-2 text-muted-foreground">Tarde</Label>
            </div>
            {doctorData.working_time.map((workDay: WorkDay) => {
                return (
                    <div key={workDay.id} className="grid grid-cols-5 items-center gap-4">
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {workDay.day}
                        </p>
                        <div className="col-span-4 flex gap-4">
                            <TimeSlotSelect
                                timeData={morningOptions}
                                placeholder={workDay.morning?.from || ''}
                                onChange={(value) => handleTimeSlotChange(workDay.id, 'morning', 'from', value)}
                            />
                            <TimeSlotSelect
                                timeData={morningOptions}
                                placeholder={workDay.morning?.to || ''}
                                onChange={(value) => handleTimeSlotChange(workDay.id, 'morning', 'to', value)}
                            />
                            <TimeSlotSelect
                                timeData={afternoonOptions}
                                placeholder={workDay.afternoon?.from || ''}
                                onChange={(value) => handleTimeSlotChange(workDay.id, 'afternoon', 'from', value)}
                            />
                            <TimeSlotSelect
                                timeData={afternoonOptions}
                                placeholder={workDay.afternoon?.to || ''}
                                onChange={(value) => handleTimeSlotChange(workDay.id, 'afternoon', 'to', value)}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

interface TimeSlotSelectInterface {
    timeData: React.ReactNode[];
    placeholder: string;
    onChange: (value: string) => void;
}
function TimeSlotSelect({ timeData, placeholder, onChange }: TimeSlotSelectInterface) {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="overflow-hidden">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Hora</SelectLabel>
                    {timeData}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};