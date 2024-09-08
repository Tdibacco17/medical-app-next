import { getPatientsData } from "@/app/actions/patients";
import PatientCreate from "@/components/PatientsPage/PatientCreate";
import PatientsTable from "@/components/PatientsPage/PatientsTable";
import SearchPatients from "@/components/PatientsPage/SearchPatients";

export default async function Patients({ searchParams }: { searchParams?: { [key: string]: string } | undefined, }) {
    const data = await getPatientsData()
    return (
        <section className="flex w-full flex-col gap-8">
            <div className="flex justify-between items-center gap-4 w-full">
                <SearchPatients searchParams={searchParams} />
                <PatientCreate />
            </div>
            <div className="w-full">
                <PatientsTable searchParams={searchParams} />
            </div>
        </section>
    )
}