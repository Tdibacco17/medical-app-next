import { DoctorIntarface, WorkDay } from "@/types/DoctorTypes";

export const timeDataMorning = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00',
    '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', 'No disponible',
];

export const timeDataAfternoon = [
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', 'No disponible',
];

export const initialWorkingTime: WorkDay[] = [
    { id: 1, day: 'Lunes', morning: { from: null, to: null }, afternoon: { from: null, to: null } },
    { id: 2, day: 'Martes', morning: { from: null, to: null }, afternoon: { from: null, to: null } },
    { id: 3, day: 'Miércoles', morning: { from: null, to: null }, afternoon: { from: null, to: null } },
    { id: 4, day: 'Jueves', morning: { from: null, to: null }, afternoon: { from: null, to: null } },
    { id: 5, day: 'Viernes', morning: { from: null, to: null }, afternoon: { from: null, to: null } }
];

export const doctorsData: DoctorIntarface[] = [
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
        ],
        createdAt: "2023-12-10T08:50:00Z",
        updatedAt: "2023-12-10T08:50:00Z"
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
        ],
        createdAt: "2023-12-10T08:50:00Z",
        updatedAt: "2023-12-10T08:50:00Z"
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
        ],
        createdAt: "2023-12-10T08:50:00Z",
        updatedAt: "2023-12-10T08:50:00Z"
    }
];