import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DoctorIntarface, WorkDay } from "@/types/DoctorTypes"

export default function DoctorTable({ doctorData }: { doctorData: DoctorIntarface }) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Dia</TableHead>
                    <TableHead className="font-semibold">Mañana</TableHead>
                    <TableHead className="font-semibold">Tarde</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {doctorData.working_time.map((workTimeData: WorkDay) => {
                    return (
                        <TableRow key={workTimeData.id}>
                            <TableCell className="font-medium">
                                {workTimeData.day}
                            </TableCell>
                            <TableCell className="font-medium">
                                {(workTimeData.morning.from !== null && workTimeData.morning.to !== null) ?
                                    `${workTimeData.morning.from} - ${workTimeData.morning?.to}`
                                    : ``}
                            </TableCell>
                            <TableCell className="font-medium">
                                {(workTimeData.afternoon.from !== null && workTimeData.afternoon.to !== null) ?
                                    `${workTimeData.afternoon?.from} - ${workTimeData.afternoon?.to}`
                                    : ``}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}