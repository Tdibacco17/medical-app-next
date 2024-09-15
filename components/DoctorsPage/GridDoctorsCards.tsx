import { getDoctorsData } from "@/app/actions/doctors"
import { DoctorCard } from "@/components/DoctorsPage/DoctorCard"
import { DoctorIntarface } from "@/types/DoctorTypes";

export async function GridDoctorsCards() {
    const doctorData = await getDoctorsData()
    return (
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-8">
            {doctorData.map((doctorData: DoctorIntarface) => {
                return <DoctorCard key={doctorData.id} doctorData={doctorData} />
            })}
        </div>
    )
}