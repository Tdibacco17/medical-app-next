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
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons"
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SpecialtyDataInterface, TimeSlot, WorkDay } from "@/types/DoctorTypes"
import { Separator } from "@/components/ui/separator"
import { initialWorkingTime, timeDataAfternoon, timeDataMorning } from "@/models/doctor"
import { Badge } from "@/components/ui/badge"
import { createDoctor } from "@/app/actions/doctors"
import { toast } from "sonner"

export default function DoctorCreateClient({ data }: { data: SpecialtyDataInterface[] }) {
    const [isOpen, setIsOpen] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null)
    const lastnameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const dniRef = useRef<HTMLInputElement>(null)

    const [selectedValues, setSelectedValues] = useState<SpecialtyDataInterface[]>([]);
    const [selectValue, setSelectValue] = useState<string>("");

    const handleSelectChange = (id: string) => {
        const selectedItem = data?.find((item) => item.id === id);

        if (selectedItem) {
            setSelectedValues((prevSelected) => {
                const isSelected = prevSelected.some((item) => item.id === id);
                const newSelectedValues = isSelected
                    ? prevSelected.filter((item) => item.id !== id)
                    : [...prevSelected, selectedItem];
                return newSelectedValues;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = nameRef.current?.value || "";
        const lastname = lastnameRef.current?.value || "";
        const email = emailRef.current?.value || "";
        const phone = phoneRef.current?.value || "";
        const dni = dniRef.current?.value || "";
        const specialty_ids = selectedValues.map(item => item.id);

        const response = await createDoctor({ name, lastname, email, phone, dni, specialty_ids });

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }
        if (response.status !== 201) {
            toast.info(response.message)
            return;
        }

        setSelectedValues([])
        setSelectValue("")
        if (nameRef.current) nameRef.current.value = "";
        if (lastnameRef.current) lastnameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (phoneRef.current) phoneRef.current.value = "";
        if (dniRef.current) dniRef.current.value = "";
        toast.success(response.message);
    };

    // const [workingTime, setWorkingTime] = useState<WorkDay[]>(initialWorkingTime);

    // const handleTimeSlotChange = useCallback((dayId: number, timeOfDay: 'morning' | 'afternoon', field: 'from' | 'to', value: string) => {
    //     setWorkingTime(prevWorkingTime =>
    //         prevWorkingTime.map(day =>
    //             day.id === dayId
    //                 ? {
    //                     ...day,
    //                     [timeOfDay]: {
    //                         ...day[timeOfDay],
    //                         [field]: value === 'No disponible' ? null : value
    //                     } as TimeSlot
    //                 }
    //                 : day
    //         )
    //     );
    // }, []);

    useEffect(() => {
        if (!isOpen) {
            // setWorkingTime(initialWorkingTime);
            setSelectedValues([])
            setSelectValue("")
            if (nameRef.current) nameRef.current.value = "";
            if (lastnameRef.current) lastnameRef.current.value = "";
            if (emailRef.current) emailRef.current.value = "";
            if (phoneRef.current) phoneRef.current.value = "";
            if (dniRef.current) dniRef.current.value = "";
        }
    }, [isOpen]);

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button variant={'blue'} className="flex items-center justify-center gap-2 h-9" size={'sm'}><PlusIcon />Crear medico</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto h-full min-w-full wrapper:min-w-[750px] ">
                <form onSubmit={handleSubmit}>
                    <SheetHeader>
                        <SheetTitle>Crear medico</SheetTitle>
                        <SheetDescription>
                            Completar con los valores del nuevo profesional.
                        </SheetDescription>
                    </SheetHeader>
                    <div className={`flex flex-col py-8`}>
                        <div className="grid gap-8 h-full">
                            <InfoDoctorValues {...{
                                nameRef, lastnameRef, emailRef, phoneRef, dniRef,
                                data, selectedValues, handleSelectChange, selectValue
                            }} />
                            <Separator />
                            {/* <InfoTimesValues workingTime={workingTime} handleTimeSlotChange={handleTimeSlotChange} /> */}
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <Button type="submit" variant={'blue'} size={'sm'}>Crear medico</Button>
                    </div>
                </form>
            </SheetContent >
        </Sheet >
    )
}

interface InfoDoctorValuesInterface {
    nameRef: RefObject<HTMLInputElement>,
    emailRef: RefObject<HTMLInputElement>,
    phoneRef: RefObject<HTMLInputElement>,
    lastnameRef: RefObject<HTMLInputElement>,
    dniRef: RefObject<HTMLInputElement>,
    data: SpecialtyDataInterface[],
    selectedValues: SpecialtyDataInterface[],
    handleSelectChange: (id: string) => void,
    selectValue: string
}
function InfoDoctorValues({ nameRef, emailRef, phoneRef, lastnameRef, dniRef, data, selectedValues, handleSelectChange, selectValue }: InfoDoctorValuesInterface) {
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
                <Label htmlFor="create-doctor-lastname">Apellido</Label>
                <Input
                    id="create-doctor-lastname"
                    ref={lastnameRef}
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
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="create-doctor-dni">DNI</Label>
                <Input
                    id="create-doctor-dni"
                    ref={dniRef}
                    className="col-span-4"
                />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="create-doctor-specialty">Especialidad</Label>
                {data?.length > 0
                    ? <Select onValueChange={handleSelectChange} value={selectValue}>
                        <SelectTrigger className="col-span-4">
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
                    : <p className="col-span-4 h-9 py-1 flex items-center justify-start border-transparent text-xs text-muted-foreground">
                        Para seleccionar una o varias especialidades primero debe crearla.
                    </p>}
            </div>
            {selectedValues.length > 0 && (
                <div className="grid grid-cols-5 items-center gap-4">
                    <Label></Label>
                    <div className="flex gap-4 col-span-4 flex-wrap">
                        {selectedValues.map((item) => (
                            <Badge key={item.id} variant={'outline'} className="flex items-center justify-between gap-2 text-nowrap h-9 relative">
                                {item.description}
                                <Button variant="ghost" size="sm" onClick={() => handleSelectChange(item.id)}
                                    className={`w-8 h-full p-0 flex items-center justify-center -mr-2`}
                                >
                                    <Cross2Icon />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

// interface InfoTimesValuesInterface {
//     workingTime: WorkDay[];
//     handleTimeSlotChange: (dayId: number, timeOfDay: 'morning' | 'afternoon', field: 'from' | 'to', value: string) => void;
// }
// function InfoTimesValues({ workingTime, handleTimeSlotChange }: InfoTimesValuesInterface) {

//     const morningOptions = useMemo(() => timeDataMorning.map(time => (
//         <SelectItem key={`morning-${time}`} value={time}>
//             {time}
//         </SelectItem>
//     )), []);

//     const afternoonOptions = useMemo(() => timeDataAfternoon.map(time => (
//         <SelectItem key={`afternoon-${time}`} value={time}>
//             {time}
//         </SelectItem>
//     )), []);

//     return (
//         <div className="flex flex-col gap-4">
//             <div className="grid grid-cols-5 gap-4">
//                 <Label className="text-muted-foreground">Día</Label>
//                 <Label className="col-span-2 text-muted-foreground">Mañana</Label>
//                 <Label className="col-span-2 text-muted-foreground">Tarde</Label>
//             </div>
//             {workingTime.map((workDay: WorkDay) => {
//                 return (
//                     <div key={workDay.id} className="grid grid-cols-5 items-center gap-4">
//                         <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                             {workDay.day}
//                         </p>
//                         <div className="col-span-4 flex gap-4">
//                             <TimeSlotSelect
//                                 timeData={morningOptions}
//                                 placeholder={workDay.morning?.from || ''}
//                                 onChange={(value) => handleTimeSlotChange(workDay.id, 'morning', 'from', value)}
//                             />
//                             <TimeSlotSelect
//                                 timeData={morningOptions}
//                                 placeholder={workDay.morning?.to || ''}
//                                 onChange={(value) => handleTimeSlotChange(workDay.id, 'morning', 'to', value)}
//                             />
//                             <TimeSlotSelect
//                                 timeData={afternoonOptions}
//                                 placeholder={workDay.afternoon?.from || ''}
//                                 onChange={(value) => handleTimeSlotChange(workDay.id, 'afternoon', 'from', value)}
//                             />
//                             <TimeSlotSelect
//                                 timeData={afternoonOptions}
//                                 placeholder={workDay.afternoon?.to || ''}
//                                 onChange={(value) => handleTimeSlotChange(workDay.id, 'afternoon', 'to', value)}
//                             />
//                         </div>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

// interface TimeSlotSelectInterface {
//     timeData: any, onChange: (value: string) => void, placeholder: string
// }
// function TimeSlotSelect({ timeData, onChange, placeholder }: TimeSlotSelectInterface) {
//     return (
//         <Select onValueChange={onChange}>
//             <SelectTrigger className="overflow-hidden">
//                 <SelectValue placeholder={placeholder} />
//             </SelectTrigger>
//             <SelectContent>
//                 <SelectGroup>
//                     {timeData}
//                 </SelectGroup>
//             </SelectContent>
//         </Select>
//     )
// }