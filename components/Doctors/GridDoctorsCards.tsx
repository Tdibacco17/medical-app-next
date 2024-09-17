import { getDoctorsData } from "@/app/actions/doctors"
import { DoctorCard } from "@/components/Doctors/DoctorCard"
import { DoctorIntarface } from "@/types/DoctorTypes";

export async function GridDoctorsCards() {
    const doctorData = await getDoctorsData();

    return (
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-8">
            {doctorData.data.length > 0 &&
                doctorData.data.map((doctorData: DoctorIntarface) => {
                    return <DoctorCard key={doctorData.id} doctorData={doctorData} />
                })}
        </div>
    )
}