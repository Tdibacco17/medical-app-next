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
import { DoctorIntarface, NewFormDataDoctorInterface, SpecialtyDataInterface, TimeSlot, WorkDay } from "@/types/DoctorTypes"
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
import { Badge } from "@/components/ui/badge"
import { Cross2Icon } from "@radix-ui/react-icons"
import { updateDoctorData } from "@/app/actions/doctors"
import { toast } from "sonner"

export default function DoctorEditClient({ doctorData, data }: { doctorData: DoctorIntarface, data: [] | SpecialtyDataInterface[] }) {
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState<NewFormDataDoctorInterface>({
        name: doctorData.name,
        email: doctorData.email,
        phone: doctorData.phone,
        lastname: doctorData.lastname,
        dni: doctorData.dni,
        id: doctorData.id
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }, []);

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

    // const [workingTime, setWorkingTime] = useState<WorkDay[]>(doctorData.working_time);

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
            // setWorkingTime(doctorData.working_time);
            setSelectedValues([])
            setSelectValue("")
            setFormData({
                name: doctorData.name,
                email: doctorData.email,
                phone: doctorData.phone,
                lastname: doctorData.lastname,
                dni: doctorData.dni,
                id: doctorData.id
            })
        }
    }, [isOpen]);

    useEffect(() => {
        // Mapea las descripciones del formData para encontrar los objetos correspondientes en 'data'
        if (data && doctorData.specialty_descriptions.length > 0) {
            const matchedSpecialties = doctorData.specialty_descriptions.map((description) =>
                data.find((item) => item.description === description)
            ).filter(Boolean) as SpecialtyDataInterface[]; // Filtra valores nulos/indefinidos

            setSelectedValues(matchedSpecialties);
        }
    }, [isOpen]);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const specialty_ids = selectedValues.map(item => item.id);

        const response = await updateDoctorData({ doctorData: formData, specialty_ids });

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }
        if (response.status !== 200) {
            toast.info(response.message)
            return;
        }

        toast.success(response.message);
    }

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="w-full text-left justify-start px-2 py-1/5">Editar</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto h-full min-w-full wrapper:min-w-[750px] ">
                <form onSubmit={handleUpdate}>
                    <SheetHeader >
                        <SheetTitle>Editar medico</SheetTitle>
                        <SheetDescription>
                            Completar con los valores que desee cambiar.
                        </SheetDescription>
                    </SheetHeader>
                    <div className={`flex flex-col py-8`}>
                        <div className="grid gap-8 h-full">
                            <InfoDoctorValues {...{ formData, handleChange, selectedValues, selectValue, handleSelectChange, data }} />
                            <Separator />
                            {/* <InfoTimesValues doctorData={doctorData} handleTimeSlotChange={handleTimeSlotChange} /> */}
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <Button type="submit" variant={'blue'} size={'sm'}>Guardar cambios</Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    )
}

interface InfoDoctorValuesProps {
    formData: NewFormDataDoctorInterface,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    selectedValues: SpecialtyDataInterface[],
    handleSelectChange: (id: string) => void,
    selectValue: string,
    data: [] | SpecialtyDataInterface[]
}
function InfoDoctorValues({ formData, handleChange, selectedValues, handleSelectChange, selectValue, data }: InfoDoctorValuesProps) {
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
                <Label htmlFor="edit-doctor-lastname">Apellido</Label>
                <Input
                    id="edit-doctor-lastname"
                    name="lastname"
                    value={formData.lastname}
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
            <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="edit-doctor-dni">DNI</Label>
                <Input
                    id="edit-doctor-dni"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
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

// interface InfoTimesValuesInterace {
//     doctorData: DoctorIntarface;
//     handleTimeSlotChange: (dayId: number, timeOfDay: 'morning' | 'afternoon', field: 'from' | 'to', value: string) => void;
// }
// function InfoTimesValues({ doctorData, handleTimeSlotChange }: InfoTimesValuesInterace) {

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
//                 <Label className="text-muted-foreground">Dia</Label>
//                 <Label className="col-span-2 text-muted-foreground">Mañana</Label>
//                 <Label className="col-span-2 text-muted-foreground">Tarde</Label>
//             </div>
//             {doctorData.working_time.map((workDay: WorkDay) => {
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
//     timeData: React.ReactNode[];
//     placeholder: string;
//     onChange: (value: string) => void;
// }
// function TimeSlotSelect({ timeData, placeholder, onChange }: TimeSlotSelectInterface) {
//     return (
//         <Select onValueChange={onChange}>
//             <SelectTrigger className="overflow-hidden">
//                 <SelectValue placeholder={placeholder} />
//             </SelectTrigger>
//             <SelectContent>
//                 <SelectGroup>
//                     <SelectLabel>Hora</SelectLabel>
//                     {timeData}
//                 </SelectGroup>
//             </SelectContent>
//         </Select>
//     );
// };