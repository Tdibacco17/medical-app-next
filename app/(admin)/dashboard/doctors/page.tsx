import { DoctorCard } from "@/components/DoctorsPage/DoctorCard"
import { DoctorIntarface } from "@/types/DoctorTypes";
import DoctorCreate from "@/components/DoctorsPage/DoctorCreate";
import { doctorsData } from "@/models/doctor";

export default function Doctors() {
    return (
        <section className="flex w-full flex-col gap-8">
            <div className="flex justify-end items-center w-full gap-4">
                <DoctorCreate />
            </div>
            <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                {doctorsData.map((doctorData: DoctorIntarface) => {
                    return <DoctorCard key={doctorData.id} doctorData={doctorData} />
                })}
            </div>
        </section>
    )
}