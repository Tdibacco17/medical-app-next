export interface DoctorIntarface {
    id: number,
    name: string,
    phone: string,
    email: string,
    specialty: string,
    working_time: WorkDay[]
}

export type TimeSlot = {
    from: string | null;
    to: string | null;
};

export interface WorkDay {
    id: number,
    day: string,
    morning: TimeSlot,
    afternoon: TimeSlot
}