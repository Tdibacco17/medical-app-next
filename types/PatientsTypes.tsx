export type FichaMedica = {
};

export type PatientInterface = {
    id: number;
    username: string;
    email: string;
    phone: string;
    fichas_medicas: FichaMedica[];
    medicalRecordId: number
};