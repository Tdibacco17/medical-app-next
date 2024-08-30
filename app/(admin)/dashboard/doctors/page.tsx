import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"

interface DoctorIntarface {
    id: number,
    name: string,
    phone: string,
    email: string,
    specialty: string,
    working_time: WorkDay[]
}

type TimeSlot = {
    from: string;
    to: string;
};

interface WorkDay {
    id: number,
    day: string,
    morning: TimeSlot | null,
    afternoon: TimeSlot | null
}

const doctorsData: DoctorIntarface[] = [
    {
        id: 1,
        name: 'Luciana Fernández',
        phone: '+541112346789',
        email: 'luciana.fernandez@example.com',
        specialty: 'Cardiología',
        working_time: [
            {
                id: 1,
                day: 'Lunes',
                morning: {
                    from: '8:00',
                    to: '12:00'
                },
                afternoon: {
                    from: '13:00',
                    to: '17:00'
                },
            },
            {
                id: 2,
                day: 'Martes',
                morning: null,
                afternoon: {
                    from: '14:00',
                    to: '18:00'
                },
            },
            {
                id: 3,
                day: 'Miércoles',
                morning: {
                    from: '9:00',
                    to: '13:00'
                },
                afternoon: null,
            },
            {
                id: 4,
                day: 'Jueves',
                morning: null,
                afternoon: null,
            },
            {
                id: 5,
                day: 'Viernes',
                morning: {
                    from: '8:00',
                    to: '12:00'
                },
                afternoon: {
                    from: '13:00',
                    to: '17:00'
                },
            }
        ]
    },
    {
        id: 2,
        name: 'Diego Rodríguez',
        phone: '+541198765432',
        email: 'diego.rodriguez@example.com',
        specialty: 'Neurología',
        working_time: [
            {
                id: 1,
                day: 'Lunes',
                morning: {
                    from: '7:00',
                    to: '11:00'
                },
                afternoon: {
                    from: '12:00',
                    to: '16:00'
                },
            },
            {
                id: 2,
                day: 'Martes',
                morning: {
                    from: '9:00',
                    to: '13:00'
                },
                afternoon: {
                    from: '14:00',
                    to: '18:00'
                },
            },
            {
                id: 3,
                day: 'Miércoles',
                morning: null,
                afternoon: null,
            },
            {
                id: 4,
                day: 'Jueves',
                morning: {
                    from: '10:00',
                    to: '14:00'
                },
                afternoon: null,
            },
            {
                id: 5,
                day: 'Viernes',
                morning: null,
                afternoon: {
                    from: '12:00',
                    to: '16:00'
                },
            }
        ]
    },
    {
        id: 3,
        name: 'Mariana López',
        phone: '+541123456789',
        email: 'mariana.lopez@example.com',
        specialty: 'Pediatría',
        working_time: [
            {
                id: 1,
                day: 'Lunes',
                morning: {
                    from: '8:00',
                    to: '12:00'
                },
                afternoon: null,
            },
            {
                id: 2,
                day: 'Martes',
                morning: null,
                afternoon: {
                    from: '14:00',
                    to: '18:00'
                },
            },
            {
                id: 3,
                day: 'Miércoles',
                morning: {
                    from: '8:00',
                    to: '12:00'
                },
                afternoon: {
                    from: '13:00',
                    to: '17:00'
                },
            },
            {
                id: 4,
                day: 'Jueves',
                morning: null,
                afternoon: {
                    from: '13:00',
                    to: '17:00'
                },
            },
            {
                id: 5,
                day: 'Viernes',
                morning: {
                    from: '8:00',
                    to: '12:00'
                },
                afternoon: null,
            }
        ]
    }
];

export default function Doctors() {
    return (
        <section className="flex w-full flex-col gap-8">
            <div className="flex justify-end w-full gap-4">
                <Button variant={'blue'} className="flex items-center justify-center gap-2" size={'sm'}><PlusIcon />Crear medico</Button>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
                {doctorsData.map((doctorData: DoctorIntarface) => {
                    return <DoctorCard key={doctorData.id} doctorData={doctorData} />
                })}
            </div>
        </section>
    )
}

export function DoctorCard({ doctorData }: { doctorData: DoctorIntarface }) {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row justify-between items-center gap-2 bg-muted/50">
                <div className="flex flex-col gap-0.5">
                    <CardTitle className="flex items-center gap-2 text-lg">{doctorData.name}</CardTitle>
                    <CardDescription>{doctorData.specialty}</CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} size={'icon'}><DotsVerticalIcon /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex flex-col w-full pt-6">
                <div className="grid w-full items-center gap-3 text-sm text-wrap break-all">
                    <div className="flex flex-col gap-0.5">
                        <p className="font-semibold">Email</p>
                        <p className="text-muted-foreground">{doctorData.email}</p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <p className="font-semibold">Teléfono</p>
                        <p className="text-muted-foreground">{doctorData.phone}</p>
                    </div>
                </div>
                <Separator className="mt-6" />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-3 pb-6 text-sm text-wrap break-all">
                <div className="grid grid-cols-3 gap-6 w-full">
                    {doctorData.working_time.map((workTimeData: WorkDay) => (
                        <div key={workTimeData.id} className="flex flex-col gap-2">
                            <p className="font-semibold">{workTimeData.day}</p>
                            <div className="flex flex-col gap-2">
                                {workTimeData.morning ? (
                                    <div className="text-muted-foreground flex flex-col items-start gap-0.5">
                                        <p className="w-16">Mañana:</p>
                                        <div className="flex items-center gap-0.5">
                                            <Button size={'icon'} variant={'outline'} className="py-4 px-6 text-xs">
                                                {workTimeData.morning.from}
                                            </Button>
                                            <p>{` - `}</p>
                                            <Button size={'icon'} variant={'outline'} className="py-4 px-6 text-xs">
                                                {workTimeData.morning.to}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-muted-foreground flex flex-col items-start gap-0.5">
                                        <p className="w-16">Mañana:</p>
                                        <div className="flex items-center gap-0.5">
                                            <Button size={'icon'} variant={'outline'} className="py-4 px-6 text-xs">
                                                /
                                            </Button>
                                            <p>{` - `}</p>
                                            <Button size={'icon'} variant={'outline'} className="py-4 px-6 text-xs">
                                                /
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {workTimeData.afternoon ? (
                                    <div className="text-muted-foreground flex flex-col items-start gap-0.5">
                                        <p className="w-16">Tarde:</p>
                                        <div className="flex items-center gap-0.5">
                                            <Button size={'icon'} variant={'outline'} className="py-4 px-6 text-xs">
                                                {workTimeData.afternoon.from}
                                            </Button>
                                            <p>{` - `}</p>
                                            <Button size={'icon'} variant={'outline'} className="py-4 px-6 text-xs">
                                                {workTimeData.afternoon.to}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-muted-foreground flex flex-col items-start gap-0.5">
                                        <p className="w-16">Tarde:</p>
                                        <div className="flex items-center gap-0.5">
                                            <Button size={'icon'} variant={'outline'} className="py-4 px-6 text-xs">
                                                /
                                            </Button>
                                            <p>{` - `}</p>
                                            <Button size={'icon'} variant={'outline'} className="py-4 px-6 text-xs">
                                                /
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}