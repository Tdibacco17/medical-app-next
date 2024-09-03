import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { patientsData } from "@/models/patients";
import { PatientInterface } from "@/types/PatientsTypes"

export default function PatientsTable() {
    return (
        <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
                <CardTitle>Pacientes</CardTitle>
                <CardDescription>
                    Total de 192 pacientes encontrados.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Nombre</TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Email
                            </TableHead>
                            <TableHead className="text-right">
                                Teléfono
                            </TableHead>
                            <TableHead className="text-right">
                                Fichas medicas
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patientsData.map((patientData: PatientInterface) => {
                            return (
                                <TableCell key={patientData.id}>

                                </TableCell>
                            )
                        })}
                        {/* <TableRow className="bg-accent">
                            <TableCell>
                                <div className="font-medium">Liam Johnson</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    liam@example.com
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                Sale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                    Fulfilled
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-06-23
                            </TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Olivia Smith</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    olivia@example.com
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                Refund
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="outline">
                                    Declined
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-06-24
                            </TableCell>
                            <TableCell className="text-right">$150.00</TableCell>
                        </TableRow> */}
                        {/* <TableRow>
                            <TableCell>
                                <div className="font-medium">Noah Williams</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    noah@example.com
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                Subscription
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                    Fulfilled
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-06-25
                            </TableCell>
                            <TableCell className="text-right">$350.00</TableCell>
                        </TableRow> */}
                        {/* <TableRow>
                            <TableCell>
                                <div className="font-medium">Emma Brown</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    emma@example.com
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                Sale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                    Fulfilled
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-06-26
                            </TableCell>
                            <TableCell className="text-right">$450.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Liam Johnson</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    liam@example.com
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                Sale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                    Fulfilled
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-06-23
                            </TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Olivia Smith</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    olivia@example.com
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                Refund
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="outline">
                                    Declined
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-06-24
                            </TableCell>
                            <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Emma Brown</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    emma@example.com
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                Sale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                    Fulfilled
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-06-26
                            </TableCell>
                            <TableCell className="text-right">$450.00</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="p-0">
                <div className="flex justify-between items-center w-full bg-muted/50 p-6">
                    <div className=" text-xs text-muted-foreground">
                        {/* {isData ? `Página ${page} de ${totalPages}` : "No hay existencias"} */}
                        Pagina
                    </div>
                    <div>
                        botones
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}