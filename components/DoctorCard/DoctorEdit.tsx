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
import { useCallback, useMemo, useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const timeDataMorning = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00',
    '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', 'No disponible',
];

const timeDataAfternoon = [
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', 'No disponible',
];

export default function DoctorEdit({ doctorData }: { doctorData: DoctorIntarface }) {
    const [formData, setFormData] = useState<{
        name: string,
        specialty: string,
        email: string,
        phone: string,
    }>({
        name: doctorData.name,
        specialty: doctorData.specialty,
        email: doctorData.email,
        phone: doctorData.phone,
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
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

    return (
        <Sheet>
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
                        <InfoTimesDoctorValues doctorData={doctorData} handleTimeSlotChange={handleTimeSlotChange} />
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

function InfoDoctorValues({ formData, handleChange }: { formData: any, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-doctor-name">Nombre</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-doctor-specialty">Especialidad</Label>
                <Input
                    id="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-doctor-email">Email</Label>
                <Input
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-doctor-phone">Teléfono</Label>
                <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="col-span-4"
                />
            </div>
        </div>
    )
}

function InfoTimesDoctorValues({ doctorData, handleTimeSlotChange
}: {
    doctorData: DoctorIntarface;
    handleTimeSlotChange: (dayId: number, timeOfDay: 'morning' | 'afternoon', field: 'from' | 'to', value: string) => void;
}) {

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

function TimeSlotSelect({ timeData, placeholder, onChange
}: {
    timeData: React.ReactNode[];
    placeholder: string;
    onChange: (value: string) => void;
}) {
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