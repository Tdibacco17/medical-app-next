import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { patientsData } from "@/models/patients";
import { PatientInterface } from "@/types/PatientsTypes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import PatientDelete from "./PatientDelete";
import PatientEdit from "./PatientEdit";
import PatientsTablePaginate from "./PatientsTablePaginate";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export default function PatientsTable({ searchParams }: { searchParams?: { [key: string]: string } | undefined, }) {
    return (
        <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
                <CardTitle>Pacientes</CardTitle>
                <CardDescription>
                    {`Total de ${patientsData.length} pacientes encontrados.`}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Ficha medica
                            </TableHead>
                            <TableHead>
                                Nombre
                            </TableHead>
                            <TableHead >
                                Email
                            </TableHead>
                            <TableHead >
                                Teléfono
                            </TableHead>
                            <TableHead>
                                {""}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patientsData.slice(0, 6).map((patientData: PatientInterface) => {
                            return (
                                <TableRow key={patientData.id}>
                                    <TableCell width={200}>
                                        <div className="font-medium">{patientData.medicalRecordId}</div>
                                    </TableCell>
                                    <TableCell width={350}>
                                        <div className="flex space-x-2">
                                            <div className="font-medium">{patientData.name}</div>
                                            {patientData.healthcarePlan &&
                                                <Badge variant={"outline"}>{patientData.healthcarePlan}</Badge>}
                                        </div>
                                    </TableCell>
                                    <TableCell width={350}>
                                        {patientData.email}
                                    </TableCell>
                                    <TableCell width={200}>
                                        {patientData.phone}
                                    </TableCell>
                                    <TableCell width={50}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant={'ghost'} size={'icon'}><DotsHorizontalIcon /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Ver detalle</DropdownMenuItem>
                                                <PatientEdit patientData={patientData} />
                                                <DropdownMenuSeparator />
                                                <PatientDelete patientId={patientData.id} />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
            <PatientsTablePaginate searchParams={searchParams} patientsData={patientsData} />
        </Card>
    )
}