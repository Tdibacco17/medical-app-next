import { WorkDay } from "@/types/DoctorTypes";

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