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
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TimeSlot, WorkDay } from "@/types/DoctorTypes"
import { Separator } from "@/components/ui/separator"
import { initialWorkingTime, timeDataAfternoon, timeDataMorning } from "@/models/doctor"

export default function DoctorCreate() {
    const [isOpen, setIsOpen] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null)
    const specialtyRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)

    const [workingTime, setWorkingTime] = useState<WorkDay[]>(initialWorkingTime);

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
            setWorkingTime(initialWorkingTime);
            if (nameRef.current) nameRef.current.value = "";
            if (specialtyRef.current) specialtyRef.current.value = "";
            if (emailRef.current) emailRef.current.value = "";
            if (phoneRef.current) phoneRef.current.value = "";
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
                            <InfoDoctorValues nameRef={nameRef} specialtyRef={specialtyRef} emailRef={emailRef} phoneRef={phoneRef} />
                            <Separator />
                            <InfoTimesValues workingTime={workingTime} handleTimeSlotChange={handleTimeSlotChange} />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" variant={'blue'} size={'sm'}>Crear medico</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent >
        </Sheet >
    )
}

interface InfoDoctorValuesInterface {
    nameRef: RefObject<HTMLInputElement>,
    specialtyRef: RefObject<HTMLInputElement>,
    emailRef: RefObject<HTMLInputElement>,
    phoneRef: RefObject<HTMLInputElement>
}
function InfoDoctorValues({ nameRef, specialtyRef, emailRef, phoneRef }: InfoDoctorValuesInterface) {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="create-doctor-name">Nombre</Label>
                <Input
                    id="create-doctor-name"
                    ref={nameRef}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="create-doctor-specialty">Especialidad</Label>
                <Input
                    id="create-doctor-specialty"
                    ref={specialtyRef}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="create-doctor-email">Email</Label>
                <Input
                    id="create-doctor-email"
                    ref={emailRef}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="create-doctor-phone">Teléfono</Label>
                <Input
                    id="create-doctor-phone"
                    ref={phoneRef}
                    className="col-span-4"
                />
            </div>
        </div>
    )
}

interface InfoTimesValuesInterface {
    workingTime: WorkDay[];
    handleTimeSlotChange: (dayId: number, timeOfDay: 'morning' | 'afternoon', field: 'from' | 'to', value: string) => void;
}
function InfoTimesValues({ workingTime, handleTimeSlotChange }: InfoTimesValuesInterface) {

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
                <Label className="text-muted-foreground">Día</Label>
                <Label className="col-span-2 text-muted-foreground">Mañana</Label>
                <Label className="col-span-2 text-muted-foreground">Tarde</Label>
            </div>
            {workingTime.map((workDay: WorkDay) => {
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
    timeData: any, onChange: (value: string) => void, placeholder: string
}
function TimeSlotSelect({ timeData, onChange, placeholder }: TimeSlotSelectInterface) {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="overflow-hidden">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {timeData}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}