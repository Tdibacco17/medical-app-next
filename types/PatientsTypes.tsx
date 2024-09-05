export type FichaMedica = {
};

export type PatientInterface = {
    id: number;
    name: string;
    email: string;
    phone: string;
    // medicalRecors: FichaMedica[];
    medicalRecordId: number,
    createdAt: string,
    updatedAt: string,
    healthcarePlan?: string
};