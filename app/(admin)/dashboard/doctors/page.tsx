import DoctorCreate from "@/components/DoctorsPage/DoctorCreate";
import { GridDoctorsCards } from "@/components/DoctorsPage/GridDoctorsCards";

export default function Doctors() {
    return (
        <section className="flex w-full flex-col gap-8">
            <div className="flex justify-end items-center w-full gap-4">
                <DoctorCreate />
            </div>
            <GridDoctorsCards />
        </section>
    )
}