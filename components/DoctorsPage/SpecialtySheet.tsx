import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import SpecialtyCreate from "./SpecialtyCreate"
import SpecialtyDelete from "./SpecialtyDelete"
import { SpecialtyDataInterface } from "@/types/DoctorTypes"
import { getSpecialties } from "@/app/actions/specialty"

export default function SpecialtySheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={'outline'} className="flex items-center justify-center gap-2 h-9" size={'sm'}>Especialidades</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto h-full min-w-full wrapper:min-w-[750px] ">
                <SheetHeader>
                    <SheetTitle>Especialidades</SheetTitle>
                    <SheetDescription>
                        Crear o eliminar un valor de una especialidad.
                    </SheetDescription>
                </SheetHeader>
                <Tabs defaultValue="Crear" className="w-full py-8">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="Crear">Crear</TabsTrigger>
                        <TabsTrigger value="Eliminar">Eliminar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Crear" className="pt-8">
                        <SpecialtyCreate />
                    </TabsContent>
                    <TabsContent value="Eliminar" className="pt-8">
                        <AsyncSpecialtyDelete />
                    </TabsContent>
                </Tabs>
            </SheetContent >
        </Sheet >
    )
}

async function AsyncSpecialtyDelete() {
    const response = await getSpecialties()
    const data: [] | SpecialtyDataInterface[] = response.data;
    return <SpecialtyDelete data={data} />
}