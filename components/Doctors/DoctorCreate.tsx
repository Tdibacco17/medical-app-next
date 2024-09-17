import { getSpecialties } from "@/app/actions/specialty";
import DoctorCreateClient from "./DoctorCreate.client";
import { SpecialtyDataInterface } from "@/types/DoctorTypes";

export default async function DoctorCreate() {
    const response = await getSpecialties()
    const data: [] | SpecialtyDataInterface[] = response.data;
    
    return <DoctorCreateClient data={data} />
}