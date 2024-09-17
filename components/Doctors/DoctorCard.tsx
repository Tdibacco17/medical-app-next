import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DoctorIntarface } from "@/types/DoctorTypes"
import DoctorDelete from "./DoctorDelete"
import DoctorEdit from "./DoctorEdit"

export function DoctorCard({ doctorData }: { doctorData: DoctorIntarface }) {

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row justify-between items-center gap-2 bg-muted/50">
                <div className="flex flex-col gap-0.5">
                    <CardTitle className="flex items-center gap-2">{`${doctorData.name} ${doctorData.lastname}`}</CardTitle>
                    <CardDescription>{doctorData.specialty_descriptions.join(", ")}</CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} size={'icon'}><DotsVerticalIcon /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DoctorEdit doctorData={doctorData} />
                        <DropdownMenuSeparator />
                        <DoctorDelete doctorId={doctorData.id} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex flex-col w-full p-6">
                <div className="grid w-full items-center gap-3 text-sm text-wrap break-all">
                    <div className="flex flex-col gap-0.5">
                        <p className="font-semibold">Email</p>
                        <p className="text-muted-foreground">{doctorData.email}</p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <p className="font-semibold">Teléfono</p>
                        <p className="text-muted-foreground">{doctorData.phone}</p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <p className="font-semibold">DNI</p>
                        <p className="text-muted-foreground">{doctorData.dni}</p>
                    </div>
                </div>
            </CardContent>
            {/* <CardFooter className="flex flex-col items-start gap-3 pb-6 text-sm text-wrap break-all ">
                <DoctorTable doctorData={doctorData} />
            </CardFooter> */}
        </Card>
    );
}