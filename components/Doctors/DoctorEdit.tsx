import { getSpecialties } from "@/app/actions/specialty";
import { DoctorIntarface, SpecialtyDataInterface } from "@/types/DoctorTypes";
import DoctorEditClient from "./DoctorEdit.client";

export default async function DoctorEdit({ doctorData }: { doctorData: DoctorIntarface }) {
    const response = await getSpecialties()
    const data: [] | SpecialtyDataInterface[] = response.data;

    return <DoctorEditClient doctorData={doctorData} data={data} />
}