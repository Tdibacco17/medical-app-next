import { DoctorCard } from "@/components/DoctorCard/DoctorCard"
import { DoctorIntarface } from "@/types/DoctorTypes";
import DoctorCreate from "@/components/DoctorCard/DoctorCreate";

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
                morning: {
                    from: null,
                    to: null
                },
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
                afternoon: {
                    from: null,
                    to: null
                },
            },
            {
                id: 4,
                day: 'Jueves',
                morning: {
                    from: null,
                    to: null
                },
                afternoon: {
                    from: null,
                    to: null
                },
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
                morning: {
                    from: null,
                    to: null
                },
                afternoon: {
                    from: null,
                    to: null
                },
            },
            {
                id: 4,
                day: 'Jueves',
                morning: {
                    from: '10:00',
                    to: '14:00'
                },
                afternoon: {
                    from: null,
                    to: null
                },
            },
            {
                id: 5,
                day: 'Viernes',
                morning: {
                    from: null,
                    to: null
                },
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
                afternoon: {
                    from: null,
                    to: null
                },
            },
            {
                id: 2,
                day: 'Martes',
                morning: {
                    from: null,
                    to: null
                },
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
                morning: {
                    from: null,
                    to: null
                },
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
                afternoon: {
                    from: null,
                    to: null
                },
            }
        ]
    }
];

export default function Doctors() {
    return (
        <section className="flex w-full flex-col gap-8">
            <div className="flex justify-end w-full gap-4">
                <DoctorCreate />
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
                {doctorsData.map((doctorData: DoctorIntarface) => {
                    return <DoctorCard key={doctorData.id} doctorData={doctorData} />
                })}
            </div>
        </section>
    )
}