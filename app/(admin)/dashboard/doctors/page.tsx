import DoctorCreate from "@/components/Doctors/DoctorCreate";
import { GridDoctorsCards } from "@/components/Doctors/GridDoctorsCards";
import SpecialtySheet from "@/components/Specialties/SpecialtySheet";

export default function Doctors() {
    return (
        <section className="flex w-full flex-col gap-8">
            <div className="flex justify-end items-center w-full gap-4">
                <SpecialtySheet />
                <DoctorCreate />
            </div>
            <GridDoctorsCards />
        </section>
    )
}