export interface DoctorIntarface {
    id: string,
    name: string,
    lastname: string,
    email: string,
    phone: string,
    dni: string,
    specialty_descriptions: string[],
    // working_time: WorkDay[],
    createdAt: string,
    updatedAt: string,
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


export interface SpecialtyDataInterface {
    id: string,
    description: string
}

export interface NewFormDataDoctorInterface {
    name: string,
    lastname: string,
    email: string,
    phone: string,
    dni: string,
    id: string
}