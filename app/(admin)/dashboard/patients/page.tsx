import PatientCreate from "@/components/Patients/PatientCreate";
import PatientsTable from "@/components/Patients/PatientsTable";
import { Input } from "@/components/ui/input";

export default function Patients() {
    return (
        <section className="flex w-full flex-col gap-8">
            <div className="flex justify-end w-full gap-4">
                <div className="flex gap-4">
                    <Input placeholder="Buscar paciente" />
                    <PatientCreate />
                </div>
            </div>
            <div className="w-full">
                <PatientsTable />
            </div>
        </section>
    )
}